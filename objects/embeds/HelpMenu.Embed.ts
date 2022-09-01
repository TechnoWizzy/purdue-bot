import {EmbedBuilder} from "discord.js";
import {bot} from "../../app.js";

export default class HelpMenuEmbed extends EmbedBuilder {
    public constructor(command: string) {
        super();
        let description = "";

        bot.commands.forEach(cmd => {
            if (command != null) {
                if (cmd.data.name.includes(command)) {
                    description += `**${cmd.data.name}** - ${description}\n`;
                    cmd.data.options.forEach(option => {
                        description += mapOptions(cmd.data.name, option);
                    })
                    description += "\n";
                }
            } else {
                description += `**${cmd.data.name}** - ${description}\n`;
                cmd.data.options.forEach(option => {
                    description += mapOptions(cmd.data.name, option);
                })
                description += "\n";
            }
        });

        this.setTitle("Help Menu");
        this.setDescription(description);
        this.setColor("Blue");
    }
}

const mapOptions = (name, option): string => {
    let response = "";
    const options = option.options;
    if (option.type) {
        response = response.concat(`⠀⠀⠀⠀\`<${option.name}>\` - ${option.description}\n`)
    } else {
        response = response.concat(`⠀⠀\`/${name} ${option.name}\` - ${option.description}\n`);
        for (let subOption of options) {
            response = response.concat(mapOptions(`${name} ${option.name}`, subOption))
        }
    }
    return response;
}

const toTitleCase = (string): string => {
    string = string.toLowerCase().split('-');
    for (let i = 0; i < string.length; i++) {
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
    }
    return string.join('-');
}