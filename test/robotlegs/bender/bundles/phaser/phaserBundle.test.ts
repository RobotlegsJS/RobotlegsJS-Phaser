// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { Context, IContext, LogLevel } from "@robotlegsjs/core";

import { PhaserBundle } from "../../../../../src/robotlegs/bender/bundles/phaser/PhaserBundle";

import { ContextSceneManager } from "../../../../../src/robotlegs/bender/extensions/contextSceneManager/impl/ContextSceneManager";

import { IContextSceneManager } from "../../../../../src/robotlegs/bender/extensions/contextSceneManager/api/IContextSceneManager";
import { ISceneMediatorMap } from "../../../../../src/robotlegs/bender/extensions/mediatorMap/api/ISceneMediatorMap";
import { IViewMediatorMap } from "../../../../../src/robotlegs/bender/extensions/mediatorMap/api/IViewMediatorMap";
import { ISceneManager } from "../../../../../src/robotlegs/bender/extensions/viewManager/api/ISceneManager";
import { SceneRegistry } from "../../../../../src/robotlegs/bender/extensions/viewManager/impl/SceneRegistry";

import { assert } from "chai";

import { CallbackLogTarget } from "../../extensions/contextStateManager/support/CallbackLogTarget";
import { LogParams } from "../../extensions/contextStateManager/support/LogParams";

describe("PhaserBundle", () => {
    let game: Phaser.Game;
    let context: IContext;

    afterEach(() => {
        if (game) {
            game.destroy(true);
        }

        if (context.initialized) {
            context.destroy();
        }

        game = null;
        context = null;
    });

    it("bundle_is_properly_installed_into_context", done => {
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

        done();
    });

    it("bundle_logs_an_error_message_when_context_scene_manager_is_not_provided", done => {
        let errorLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget((log: LogParams) => {
            if (log.source instanceof PhaserBundle && log.level === LogLevel.ERROR) {
                errorLogged = log.message === "PhaserBundle requires IContextSceneManager.";
            }
        });

        context = new Context();
        context.addLogTarget(logTarget);
        context.install(PhaserBundle).initialize();
        assert.isTrue(errorLogged);

        done();
    });
});
