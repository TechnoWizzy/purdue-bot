import * as nodemailer from "nodemailer";
import * as config from "../config.json";
import {bot} from "../app";

export default class Email extends String {

    private readonly _isValid: boolean;

    public constructor(email: string) {
        super(email);
        this._isValid = validateEmail(email);
    }

    get isValid(): boolean {
        return this._isValid;
    }

    public async send(url: string) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.username,
                pass: config.email.password
            }
        });
        let mailOptions = {
            from: config.email.username,
            to: this.valueOf(),
            subject: 'PUGG Discord Account Verification',
            text:
                `Click this link to verify your account!
            \nLink: ${url}
            \nClick the \'Purdue Button\' in #verify to finalize verification!`
        };

        await transporter.sendMail(mailOptions, async function (error) {
            if (error) await bot.logger.error(`An error occurred sending an email to ${mailOptions.to}`, error);
            else await bot.logger.info("Verification email sent");
        });
    }
}

function validateEmail(s: string) {
    let emailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/m);
    let matches = s.toLowerCase().match(emailRegEx);
    if (matches != null) {
        return matches[0].endsWith('@purdue.edu') || matches[0].endsWith('@alumni.purdue.edu') || matches[0].endsWith("@student.purdueglobal.edu");
    }
    return false;
}