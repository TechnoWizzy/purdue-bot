import {EmbedBuilder} from "discord.js";

export default class WelcomeEmbed extends EmbedBuilder {
    public constructor() {
        super();
        this.setColor("Gold");
        this.setTitle("Welcome");
        this.setDescription("PlaceHolder");
    }
}