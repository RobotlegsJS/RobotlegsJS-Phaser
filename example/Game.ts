// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, IContext, MVCSBundle } from "@robotlegsjs/core";
import { ContextSceneManager } from "../src";
import { PhaserBundle } from "../src/robotlegs/bender/bundles/phaser/PhaserBundle";
import "phaser";
import { SceneMediatorConfig } from "./config/SceneMediatorConfig";
import { Boot } from "./scenes/Boot";
import { SceneKey } from "./constants/SceneKey";
import { GameConfig } from "./config/GameConfig";

export class Game extends Phaser.Game {
    private _context: IContext;

    constructor() {
        super({
            type: Phaser.CANVAS,
            width: 800,
            height: 600,
            backgroundColor: "#010101",
            parent: "phaser-example"
        });

        this._context = new Context();
        this._context
            .install(MVCSBundle, PhaserBundle)
            .configure(new ContextSceneManager((this as any).scene))
            .configure(SceneMediatorConfig)
            .configure(GameConfig)
            .initialize();
        (this as any).scene.add(SceneKey.BOOT, new Boot(SceneKey.BOOT));
        (this as any).scene.start(SceneKey.BOOT);
    }
}
