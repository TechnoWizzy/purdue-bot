import CommandBuilder from "../objects/CommandBuilder";
import * as commands from "../commands.json";
import {ChatInputCommandInteraction} from "discord.js";

module.exports = {
    data: new CommandBuilder(commands.help.name, commands.help.description),

    execute(interaction: ChatInputCommandInteraction): Promise<any> {
        return new Promise(() => {

        })
    }
}