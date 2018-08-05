import { injectable } from "@robotlegsjs/core";

import { SceneMediator } from "../../src/robotlegs/bender/extensions/sceneMediatorMap/impl/SceneMediator";

import { Boot } from "../scenes/Boot";

@injectable()
export class BootMediator extends SceneMediator<Boot> {
    public initialize(): void {
        console.log("BootMediator: initialize");
    }

    public destroy(): void {
        console.log("BootMediator: destroy");
    }
}
