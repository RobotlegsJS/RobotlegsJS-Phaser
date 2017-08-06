import { injectable } from "robotlegs";

import { StateMediator } from "@robotlegsjs/phaser";

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
