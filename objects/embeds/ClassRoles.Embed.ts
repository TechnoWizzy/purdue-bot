import {EmbedBuilder} from "discord.js";

export default class ClassRolesEmbed extends EmbedBuilder {
    public constructor() {
        super();
        this.setTitle("Class Roles")
        this.setDescription("React with the corresponding button for your Purdue Graduating Class below:")
    }
}