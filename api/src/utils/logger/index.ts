export class Logger {

    public info(message: string): void {
        console.log(`${new Date()} info >>> ${message}`);
    }

    public debug(message: string): void {
        console.log(`${new Date()} debug >>> ${message}`);
    }

    public error(message: string): void {
        console.log(`${new Date()} error >>> ${message}`);
    }
}
