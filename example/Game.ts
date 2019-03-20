// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, IContext, MVCSBundle } from "@robotlegsjs/core";

import { ContextSceneManager } from "../src/robotlegs/bender/extensions/contextSceneManager/impl/ContextSceneManager";
import { PhaserBundle } from "../src/robotlegs/bender/bundles/phaser/PhaserBundle";

import { GameConfig } from "./config/GameConfig";
import { SceneMediatorConfig } from "./config/SceneMediatorConfig";

import { SceneKey } from "./constants/SceneKey";

import { Boot } from "./scenes/Boot";
import { Main } from "./scenes/Main";
import { Preload } from "./scenes/Preload";

export class Game extends Phaser.Game {
    private _context: IContext;

    constructor() {
        super({
            type: Phaser.CANVAS,
            width: 960,
            height: 400,
            backgroundColor: "#010101",
            canvas: <HTMLCanvasElement>document.getElementById("canvas")
        });

        this._context = new Context();
        this._context
            .install(MVCSBundle, PhaserBundle)
            .configure(new ContextSceneManager(this.scene))
            .configure(SceneMediatorConfig)
            .configure(GameConfig)
            .initialize();

        this.scene.add(SceneKey.BOOT, new Boot());
        this.scene.add(SceneKey.PRELOAD, new Preload());
        this.scene.add(SceneKey.MAIN, new Main());

        this.scene.start(SceneKey.BOOT);
    }
}
