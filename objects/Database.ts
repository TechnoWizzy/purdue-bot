import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import * as config from "../config.json";
import {bot} from "../app.js";
import {MongoClient} from "mongodb";

export const collections: { players?: mongoDB.Collection, teams?:mongoDB.Collection, games?: mongoDB.Collection, students?: mongoDB.Collection } = {}

export default class Database extends MongoClient {

    public constructor() {
        super(`mongodb://${config.mongo.username}:${config.mongo.password}@${config.mongo.url}/?authMechanism=DEFAULT`);
    }

    public async init() {
        dotenv.config();
        await this.connect();
        const db: mongoDB.Db = this.db("PUGG");
        collections.students = db.collection("students");
        await bot.logger.info(`Connected to ${db.databaseName} Database`);
    }
}