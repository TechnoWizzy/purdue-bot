import CommandBuilder from "../objects/CommandBuilder";
import * as commands from "../commands.json";
import * as config from "../config.json";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import ClassRolesEmbed from "../objects/embeds/ClassRoles.Embed";
import CollegeRolesEmbed from "../objects/embeds/CollegeRoles.Embed";
import WelcomeEmbed from "../objects/embeds/Welcome.Embed";
import {bot} from "../app";
import VerificationEmbed from "../objects/embeds/Verification.Embed";

module.exports = {
    data: new CommandBuilder(commands.setup.name, commands.setup.description)
        .addStringOption((string) => string
            .setName("menu-name")
            .setDescription("The menu you want to generate")
            .addChoices(
                {name: "Class Roles", value: "class-roles"},
                {name: "College Roles", value: "college-roles"},
                {name: "Welcome", value: "welcome"},
                {name: "Verification", value: "verification"})
            .setRequired(true)
        )
    ,

    async execute(interaction: ChatInputCommandInteraction): Promise<boolean> {
        let menuName = interaction.options.getString("menu-name");
        switch(menuName) {
            case "class-roles":
                const classRolesEmbed = new ClassRolesEmbed();
                const classRolesRow = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder().setLabel("2022").setCustomId(config.roles["2022"]).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("2023").setCustomId(config.roles["2023"]).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("2024").setCustomId(config.roles["2024"]).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("2025").setCustomId(config.roles["2025"]).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("2025").setCustomId(config.roles["2026"]).setStyle(ButtonStyle.Secondary)
                    );
                interaction.reply({
                    embeds: [classRolesEmbed],
                    components: [classRolesRow]
                }).catch((error) => {
                    bot.logger.error(`${interaction.commandName} cmd issued by ${interaction.user.username} failed`, error);
                    return false;
                });
                return true;
            case "college-roles":
                const collegeRolesEmbed = new CollegeRolesEmbed();
                const collegeRolesRow1 = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder().setLabel("Honors").setEmoji("🕯").setCustomId(config.roles.honors).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Liberal Arts").setEmoji("📝").setCustomId(config.roles.liberal).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Veterinary").setEmoji("🐴").setCustomId(config.roles.veterinary).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Health").setEmoji("💉").setCustomId(config.roles.health).setStyle(ButtonStyle.Secondary)
                    );
                const collegeRolesRow2 = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder().setLabel("Science").setEmoji("🔬").setCustomId(config.roles.science).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Exploratory").setEmoji("❔").setCustomId(config.roles.exploratory).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Polytechnic").setEmoji("📐").setCustomId(config.roles.polytechnic).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Engineering").setEmoji("🛠️").setCustomId(config.roles.engineering).setStyle(ButtonStyle.Secondary),
                    );
                const collegeRolesRow3 = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder().setLabel("Pharmacy").setEmoji("🧪").setCustomId(config.roles.pharmacy).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Education").setEmoji("🧮").setCustomId(config.roles.education).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Management").setEmoji("👔").setCustomId(config.roles.management).setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder().setLabel("Agriculture").setEmoji("🚜").setCustomId(config.roles.agriculture).setStyle(ButtonStyle.Secondary)
                    );
                interaction.reply({
                    embeds: [collegeRolesEmbed],
                    components: [collegeRolesRow1, collegeRolesRow2, collegeRolesRow3]
                }).catch((error) => {
                    bot.logger.error(`${interaction.commandName} cmd issued by ${interaction.user.username} failed`, error);
                    return false;
                });
                return true;
            case "welcome":
                const welcomeEmbed = new WelcomeEmbed();
                await interaction.reply({
                    embeds: [welcomeEmbed]
                }).catch((error) => {
                    bot.logger.error(`${interaction.commandName} cmd issued by ${interaction.user.username} failed`, error);
                    return false;
                });
                return true;

            case "verification":
                const verificationEmbed = new VerificationEmbed();
                const verificationRow = new ActionRowBuilder<ButtonBuilder>()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(config.roles.verified)
                            .setLabel("Verify")
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(config.emotes.purdue)
                    );
                await interaction.reply({
                    embeds: [verificationEmbed],
                    components: [verificationRow]
                }).catch((error) => {
                    bot.logger.error(`${interaction.commandName} cmd issued by ${interaction.user.username} failed`, error);
                    return false;
                });
                return true;
        }
        return false;
    }
}