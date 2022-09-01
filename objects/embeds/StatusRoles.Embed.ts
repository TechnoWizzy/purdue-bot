import {EmbedBuilder} from "discord.js";

export default class StatusRolesEmbed extends EmbedBuilder {
    public constructor() {
        super();
        this.setTitle("Status");
        this.setDescription("React with the corresponding button for your status below:")
    }
}