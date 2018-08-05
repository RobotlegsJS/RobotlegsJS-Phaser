import { injectable } from "@robotlegsjs/core";

import { SceneMediator } from "../../src/robotlegs/bender/extensions/sceneMediatorMap/impl/SceneMediator";

import { Preload } from "../scenes/Preload";

@injectable()
export class PreloadMediator extends SceneMediator<Preload> {
    public initialize(): void {
        console.log("PreloadMediator: initialize");
    }

    public destroy(): void {
        console.log("PreloadMediator: destroy");
    }
}
