import {EmbedBuilder} from "discord.js";

export default class CollegeRolesEmbed extends EmbedBuilder {
    public constructor() {
        super();
        this.setTitle("Roles For Colleges")
        this.setDescription("React with the corresponding button for your school below:");
    }
}