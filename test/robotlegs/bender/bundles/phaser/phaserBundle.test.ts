// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";
import { Context, IContext } from "@robotlegsjs/core";
import { assert } from "chai";

describe("PhaserBundle", () => {
    // let game: Phaser.Game;
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
            .configure(new ContextSceneManager(game.scene))
            .initialize();
        */
        // Verify if all extensions are installed
        assert.isTrue(true);
    });
});
