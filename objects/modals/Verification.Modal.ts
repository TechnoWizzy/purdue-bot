import {ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";

const customId = "verify";
const title = "Purdue Email Verification";
const emailCustomId = "email";
const emailLabel = "Please enter your Purdue email address";

export default class VerificationModal extends ModalBuilder {
    public constructor() {
        super();
        this.setCustomId(customId);
        this.setTitle(title);
        const emailInput = new TextInputBuilder().setCustomId(emailCustomId).setLabel(emailLabel).setStyle(TextInputStyle.Short);
        const row = new ActionRowBuilder<TextInputBuilder>().addComponents(emailInput);
        this.addComponents(row);
    }
}