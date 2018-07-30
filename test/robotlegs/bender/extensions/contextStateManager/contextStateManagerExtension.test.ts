// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context, LogLevel } from "@robotlegsjs/core";

import { IContextStateManager, ContextStateManager, ContextStateManagerExtension } from "../../../../../src";

import { CallbackLogTarget } from "./support/CallbackLogTarget";
import { LogParams } from "./support/LogParams";

describe("ContextStateManagerExtension", () => {
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
            context.install(ContextStateManagerExtension);
        }
        assert.throws(installExtensionAfterInitialization, Error);
    });

    it("contextStateManager_is_mapped", () => {
        let phaserStateManager: Phaser.StateManager = new Phaser.StateManager(null);
        let actual: ContextStateManager = null;
        context.install(ContextStateManagerExtension).configure(new ContextStateManager(phaserStateManager));
        context.whenInitializing(() => {
            actual = context.injector.get<ContextStateManager>(IContextStateManager);
        });
        context.initialize();
        assert.equal(actual.stateManager, phaserStateManager);
    });

    it("second_ContextStateManager_is_ignored", () => {
        let phaserStateManager: Phaser.StateManager = new Phaser.StateManager(null);
        let actual: ContextStateManager = null;
        let secondPhaserStateManager: Phaser.StateManager = new Phaser.StateManager(null);
        context
            .install(ContextStateManagerExtension)
            .configure(new ContextStateManager(phaserStateManager), new ContextStateManager(secondPhaserStateManager));
        context.whenInitializing(() => {
            actual = context.injector.get<ContextStateManager>(IContextStateManager);
        });
        context.initialize();
        assert.equal(actual.stateManager, phaserStateManager);
    });

    it("extension_logs_error_when_context_initialized_with_no_ContextStateManager", () => {
        let errorLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget(function(log: LogParams): void {
            if (log.source instanceof ContextStateManagerExtension && log.level === LogLevel.ERROR) {
                errorLogged = true;
            }
        });
        context.install(ContextStateManagerExtension);
        context.addLogTarget(logTarget);
        context.initialize();
        assert.isTrue(errorLogged);
    });
});
