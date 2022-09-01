import {ButtonBuilder, ButtonStyle} from "discord.js";
import * as config from "../../config.json";

export default class WelcomeButton extends ButtonBuilder {
    public constructor() {
        super();
        this.setLabel("Access Purdue University Discord");
        this.setCustomId(config.roles.verified);
        this.setEmoji(config.emotes.purdue);
        this.setStyle(ButtonStyle.Success);
    }
}