// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { SceneMediator } from "../../src/robotlegs/bender/extensions/mediatorMap/impl/SceneMediator";

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
