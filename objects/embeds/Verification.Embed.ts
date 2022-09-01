import {EmbedBuilder} from "discord.js";
import * as config from "../../config.json";

const title = "Purdue Email Verification";
const color = "#f1c40f";
const description = `To receive the <@&${config.roles.verified}> role you must verify your Purdue email.\n\n` +
    "**How to authenticate yourself as a Purdue Student!**\n" +
    "1. Click the **Verify Button** to have a unique link sent to your email.\n" +
    "2. Click the **Verify Button** again once you have completed the steps sent to your inbox.\n";

export default class VerificationEmbed extends EmbedBuilder {
    public constructor() {
        super();
        this.setTitle(title);
        this.setColor(color);
        this.setDescription(description);
    }
}