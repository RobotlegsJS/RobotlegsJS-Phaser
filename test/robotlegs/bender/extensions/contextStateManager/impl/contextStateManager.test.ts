// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import {
    IContextStateManager,
    ContextStateManager
} from "../../../../../../src";

describe("ContextStateManager", () => {
    let game: Phaser.Game;
    let contextStateManager: IContextStateManager;

    beforeEach(() => {
        game = new Phaser.Game();
    });

    afterEach(() => {
        game = null;
        contextStateManager = null;
    });

    it("stateManager_is_stored", () => {
        contextStateManager = new ContextStateManager(game.state);
        assert.isNotNull(contextStateManager.stateManager);
        assert.equal(contextStateManager.stateManager, game.state);
    });

    it("ContextStateManager_throws_a_error_when_state_manager_is_null", () => {
        function inicializeContextStateManagerWithNullStateManager(): void {
            contextStateManager = new ContextStateManager(null);
        }
        assert.throws(inicializeContextStateManagerWithNullStateManager, Error);
    });

    it("ContextStateManager_throws_a_error_when_state_manager_is_undefined", () => {
        function inicializeContextStateManagerWithUndefinedStateManager(): void {
            contextStateManager = new ContextStateManager(undefined);
        }
        assert.throws(
            inicializeContextStateManagerWithUndefinedStateManager,
            Error
        );
    });
});
