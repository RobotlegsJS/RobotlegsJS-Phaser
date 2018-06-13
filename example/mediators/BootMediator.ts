import { injectable } from "@robotlegsjs/core";

import { StateMediator } from "../../src/robotlegs/bender/extensions/stateMediatorMap/impl/StateMediator";

import { Boot } from "../states/Boot";

@injectable()
export class BootMediator extends StateMediator<Boot> {

    public initialize(): void {
        console.log("BootMediator: initialize");
    }

    public destroy(): void {
        console.log("BootMediator: destroy");
    }
}
