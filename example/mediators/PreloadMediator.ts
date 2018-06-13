import { injectable } from "@robotlegsjs/core";

import { StateMediator } from "../../src/robotlegs/bender/extensions/stateMediatorMap/impl/StateMediator";

import { Preload } from "../states/Preload";

@injectable()
export class PreloadMediator extends StateMediator<Preload> {

    public initialize(): void {
        console.log("PreloadMediator: initialize");
    }

    public destroy(): void {
        console.log("PreloadMediator: destroy");
    }
}
