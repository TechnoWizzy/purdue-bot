import {Client, ClientOptions, Collection, Guild, IntentsBitField, REST, Routes, TextChannel} from "discord.js";
import * as config from "../config.json";
import Logger from "./Logger";
import * as fs from "fs";
import Database from "./Database";

const options = {
    intents: [
        IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildBans, IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions, IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageReactions, IntentsBitField.Flags.GuildPresences
    ]
} as ClientOptions;

export default class Bot extends Client {

    private _guild: Guild;
    private _logger: Logger;
    private _commands: Collection<any, any>;
    private _logChannel: TextChannel;

    public constructor() {
        super(options);
        this.commands = new Collection();
    }

    get guild(): Guild {
        return this._guild;
    }

    set guild(value: Guild) {
        this._guild = value;
    }

    get logger(): Logger {
        return this._logger;
    }

    set logger(value: Logger) {
        this._logger = value;
    }

    get commands() {
        return this._commands;
    }

    set commands(value) {
        this._commands = value;
    }

    get logChannel() {
        return this._logChannel;
    }

    set logChannel(value: TextChannel) {
        this._logChannel = value;
    }

    async init() {
        this.guild = await this.guilds.fetch(config.guild);
        this.logChannel = await this._guild.channels.fetch(config.channels.log) as TextChannel;
        this.logger = new Logger(this._logChannel);
        await this.updateCommands(config.token);
        await new Database().init();
        await this.logChannel.permissionOverwrites.create("751910711218667562",
            {
                "SendMessages": true,
                "ViewChannel": true,
                "ManageMessages": true
            })
    }

    async updateCommands(token: string) {
        const commands = [];
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        const rest = new REST({ version: '9' }).setToken(token);
        const id = this.application.id;
        const guild = this.guilds.cache.get(config.guild);

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            if (command.data) {
                commands.push(command.data.build());
                this.commands.set(command.data.name, command);
            }
        }

        try {
            await rest.put(Routes.applicationGuildCommands(id, guild.id), {body: commands});
            await this.logger.info("Application commands uploaded");
        } catch (error) {
            await this.logger.error("Error uploading application commands", error);
        }
    }
}