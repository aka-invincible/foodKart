export class CommandWithTimeStamp {

    constructor(timestamp, command) {
        this.timestamp = timestamp;
        this.command = command;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getCommand() {
        return this.command;
    }
}