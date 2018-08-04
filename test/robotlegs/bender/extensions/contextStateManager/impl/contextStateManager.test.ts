// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { ContextSceneManager, IContextSceneManager } from "../../../../../../src";
import "../../../../../entry";

describe("ContextSceneManager", () => {
    let game: Phaser.Game;
    let contextStateManager: IContextSceneManager;

    beforeEach(() => {
        game = new Phaser.Game();
    });

    afterEach(() => {
        game = null;
        contextStateManager = null;
    });

    it("stateManager_is_stored", () => {
        contextStateManager = new ContextSceneManager(game.scene);
        assert.isNotNull(contextStateManager.sceneManager);
        assert.equal(contextStateManager.sceneManager, game.scene);
    });

    it("ContextStateManager_throws_a_error_when_state_manager_is_null", () => {
        function inicializeContextStateManagerWithNullStateManager(): void {
            contextStateManager = new ContextSceneManager(null);
        }
        assert.throws(inicializeContextStateManagerWithNullStateManager, Error);
    });

    it("ContextStateManager_throws_a_error_when_state_manager_is_undefined", () => {
        function inicializeContextStateManagerWithUndefinedStateManager(): void {
            contextStateManager = new ContextSceneManager(undefined);
        }
        assert.throws(inicializeContextStateManagerWithUndefinedStateManager, Error);
    });
});
