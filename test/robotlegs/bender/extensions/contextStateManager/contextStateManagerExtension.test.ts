// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Context, IContext, LogLevel } from "@robotlegsjs/core";
import { assert } from "chai";
import { ContextSceneManager, ContextSceneManagerExtension, IContextSceneManager } from "../../../../../src";
import "../../../../entry";
import { CallbackLogTarget } from "./support/CallbackLogTarget";
import { LogParams } from "./support/LogParams";

describe("ContextSceneManagerExtension", () => {
    let context: IContext;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context.destroy();
        context = null;
    });

    it("installing_after_initialization_throws_error", () => {
        function installExtensionAfterInitialization(): void {
            context.initialize();
            context.install(ContextSceneManagerExtension);
        }
        assert.throws(installExtensionAfterInitialization, Error);
    });

    it("contextSceneManager_is_mapped", () => {
        let game: Phaser.Game = new Phaser.Game();
        let actual: ContextSceneManager = null;
        context.install(ContextSceneManagerExtension).configure(new ContextSceneManager(game.scene));
        context.whenInitializing(() => {
            actual = context.injector.get<ContextSceneManager>(IContextSceneManager);
        });
        context.initialize();
        assert.equal(actual.sceneManager, game.scene);
    });

    it("second_ContextSceneManager_is_ignored", () => {
        let game: Phaser.Game = new Phaser.Game();
        let actual: ContextSceneManager = null;
        let secondGame: Phaser.Game = new Phaser.Game();
        context
            .install(ContextSceneManagerExtension)
            .configure(new ContextSceneManager(game.scene), new ContextSceneManager(secondGame.scene));
        context.whenInitializing(() => {
            actual = context.injector.get<ContextSceneManager>(IContextSceneManager);
        });
        context.initialize();
        assert.equal(actual.sceneManager, game.scene);
    });

    it("extension_logs_error_when_context_initialized_with_no_ContextSceneManager", () => {
        let errorLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget(function(log: LogParams): void {
            if (log.source instanceof ContextSceneManagerExtension && log.level === LogLevel.ERROR) {
                errorLogged = true;
            }
        });
        context.install(ContextSceneManagerExtension);
        context.addLogTarget(logTarget);
        context.initialize();
        assert.isTrue(errorLogged);
    });
});
