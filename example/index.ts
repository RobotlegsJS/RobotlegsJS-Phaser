/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import "reflect-metadata";

import { Context, IContext, MVCSBundle } from "@robotlegsjs/core";
import { PhaserBundle } from "../src/robotlegs/bender/bundles/phaser/PhaserBundle";
import { ContextStateManager } from "../src/robotlegs/bender/extensions/contextStateManager/impl/ContextStateManager";

import { StateKey } from "./constants/StateKey";

import { Boot } from "./states/Boot";
import { Preload } from "./states/Preload";
import { GameTitle } from "./states/GameTitle";
import { Main } from "./states/Main";
import { GameOver } from "./states/GameOver";

import { GameConfig } from "./config/GameConfig";
import { StateMediatorConfig } from "./config/StateMediatorConfig";

class Game extends Phaser.Game {

    private _context: IContext;

    constructor() {

        super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

        this._context = new Context();
        this._context.install(MVCSBundle, PhaserBundle)
            .configure(new ContextStateManager(this.state))
            .configure(StateMediatorConfig)
            .configure(GameConfig)
            .initialize();

        this.state.add(StateKey.BOOT, Boot, false);
        this.state.add(StateKey.PRELOAD, Preload, false);
        this.state.add(StateKey.GAME_TITLE, GameTitle, false);
        this.state.add(StateKey.MAIN, Main, false);
        this.state.add(StateKey.GAME_OVER, GameOver, false);

        this.state.start(StateKey.BOOT);
    }
}

new Game();
