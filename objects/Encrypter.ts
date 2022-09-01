import {bot} from "../app";
import * as crypto from "crypto";
import * as config from "../config.json";

export default class Encrypter {
    protected constructor() {

    }

    public static getInstance(): Encrypter {
        return new Encrypter();
    }

    /**
     * Encrypts a string
     * @param text
     */
    public encrypt(text) {

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-ctr", config.key, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    };
}