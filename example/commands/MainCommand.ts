import { injectable, Event } from "../../node_modules/@robotlegsjs/core";
@injectable()
export class MainCommand {
    public execute(event: Event): void {
        console.log(event.type, event.data);
    }
}
