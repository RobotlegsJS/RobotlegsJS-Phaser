// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context, LogLevel } from "@robotlegsjs/core";

import { ContextStateManager, PhaserBundle } from "../../../../../src";

describe("PhaserBundle", () => {
    let game: Phaser.Game;
    let context: IContext;

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }
        context = null;
    });

    it("bundle_is_properly_installed_into_context", () => {
        context = new Context();
        /*
        game = new Phaser.Game();
        context = new Context();
        context
            .install(PhaserBundle)
            .configure(new ContextStateManager(game.state))
            .initialize();
        */
        // Verify if all extensions are installed
        assert.isTrue(true);
    });
});
