import Bot from "./objects/Bot";
import * as config from "./config.json";
import {
    ButtonInteraction,
    CommandInteraction, GuildMember,
    Interaction,
    Message,
    ModalSubmitInteraction,
    SelectMenuInteraction,
} from "discord.js";
import Student from "./objects/Student";
import {collections} from "./objects/Database";
import Email from "./objects/Email";
import VerificationModal from "./objects/modals/Verification.Modal";
import Encrypter from "./objects/Encrypter";

export const bot = new Bot();

bot.login(config.token).catch();

bot.on('ready', async () => {
    bot.init().catch();
});

bot.on('interactionCreate', (interaction: Interaction) => {
    if (interaction.isCommand()) handleCommand(interaction as CommandInteraction).catch();
    else if (interaction.isButton()) handleButton(interaction as ButtonInteraction).catch();
    else if (interaction.isSelectMenu()) handleSelectMenu(interaction as SelectMenuInteraction).catch();
    else if (interaction.isModalSubmit()) handleModal(interaction as ModalSubmitInteraction).catch();
});

bot.on("messageCreate", (message: Message) => {
    handleMessage(message).catch();
});

/**
 * Executes logic on a new Message
 * @param message
 */
async function handleMessage(message: Message) {

}

/**
 * Executes logic on a Command Interaction
 * @param interaction
 */
async function handleCommand(interaction: CommandInteraction) {
    const command = bot.commands.get(interaction.commandName);
    command.execute(interaction).then((response) => {
        console.log(response);
        if (response != true) {
            //interaction.reply(new FailedCommandResponse());
        } else {
            bot.logger.info(`${interaction.commandName} cmd issued by ${interaction.user.username}`);
        }
    })
}

/**
 * Executes logic on a Button Interaction
 * @param interaction
 */
async function handleButton(interaction: ButtonInteraction) {
    if (interaction.customId == config.roles.verified) {
        const student = await Student.get(interaction.user.id);
        if (student) {
            await interaction.reply({content: "You are verified", ephemeral: true});
            await (interaction.member as GuildMember).roles.add(config.roles.verified);
        } else {
            await interaction.showModal(new VerificationModal());
        }
    }
}

/**
 * Executes logic on a SelectMenu Interaction
 * @param selectMenu
 */
async function handleSelectMenu(selectMenu: SelectMenuInteraction) {

}

/**
 * Executes logic on a ModalSubmit Interaction
 * @param interaction
 */
async function handleModal(interaction: ModalSubmitInteraction) {
    switch (interaction.customId) {
        case "verify": {
            const email = new Email(interaction.fields.getTextInputValue("email"));
            const student = Student.fromObject(await collections.students.findOne({_email: email}));
            if (student && student.status) {
                await interaction.reply({content: "This email is already in use.", ephemeral: true});
            } else {
                if (email.isValid) {
                    const encrypter = Encrypter.getInstance();
                    const username = interaction.user.username;
                    const hash = encrypter.encrypt(`${interaction.user.id}-${Date.now()}`);
                    const token = `${hash.iv}-${hash.content}`;
                    const url = `https://www.technowizzy.dev/api/v1/students/verify/${token}`;
                    await email.send(url);
                    await bot.logger.info(`New Student Registered - Username: ${username}`);
                    await Student.post(new Student(interaction.user.id, username, email.valueOf(), 0, false));
                    await interaction.reply({content: `A verification email was sent to \`${email.valueOf()}\`. Click the **Purdue Button** once you have verified!`, ephemeral: true})
                } else {
                    await interaction.reply({content: `The email you provided, \`${email.valueOf()}\`, is invalid. Please provide a valid Purdue email.`, ephemeral: true})
                }
            }
        } break;
    }
}