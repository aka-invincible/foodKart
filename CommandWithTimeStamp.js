export class CommandWithTimeStamp {

    CommandWithTimeStamp(timestamp, command) {
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