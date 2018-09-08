// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { Context, IContext } from "@robotlegsjs/core";

import { PhaserBundle } from "../../../../../src/robotlegs/bender/bundles/phaser/PhaserBundle";

import { ContextSceneManager } from "../../../../../src/robotlegs/bender/extensions/contextSceneManager/impl/ContextSceneManager";

import { IContextSceneManager } from "../../../../../src/robotlegs/bender/extensions/contextSceneManager/api/IContextSceneManager";
import { ISceneMediatorMap } from "../../../../../src/robotlegs/bender/extensions/mediatorMap/api/ISceneMediatorMap";
import { IViewMediatorMap } from "../../../../../src/robotlegs/bender/extensions/mediatorMap/api/IViewMediatorMap";
import { ISceneManager } from "../../../../../src/robotlegs/bender/extensions/viewManager/api/ISceneManager";
import { SceneRegistry } from "../../../../../src/robotlegs/bender/extensions/viewManager/impl/SceneRegistry";

import { assert } from "chai";

describe("PhaserBundle", () => {
    let game: Phaser.Game;
    let context: IContext;

    afterEach(() => {
        game.destroy(true);

        if (context.initialized) {
            context.destroy();
        }

        game = null;
        context = null;
    });

    it("bundle_is_properly_installed_into_context", () => {
        game = new Phaser.Game({
            type: Phaser.CANVAS,
            width: 800,
            height: 600,
            backgroundColor: "#010101",
            parent: "phaser-example"
        });
        context = new Context();
        context
            .install(PhaserBundle)
            .configure(new ContextSceneManager(game.scene))
            .initialize();

        // Verify if all extensions are installed
        assert.isTrue(context.injector.isBound(IContextSceneManager));
        assert.isTrue(context.injector.isBound(ISceneMediatorMap));
        assert.isTrue(context.injector.isBound(IViewMediatorMap));
        assert.isTrue(context.injector.isBound(ISceneManager));
        assert.isTrue(context.injector.isBound(SceneRegistry));
    });
});
