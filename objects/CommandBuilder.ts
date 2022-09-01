import {SlashCommandBuilder} from "discord.js";

export default class CommandBuilder extends SlashCommandBuilder {
    public constructor(name: string, description: string) {
        super();
        this.setName(name);
        this.setDescription(description);
    }

    public build() {
        return this.toJSON();
    }
}