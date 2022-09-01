export default class FailedCommandResponse {
    public content: string = "Sorry, this command has failed. The Devs have been notified and will work to fix it!";
    public ephemeral: boolean = true;

    public constructor() {

    }
}