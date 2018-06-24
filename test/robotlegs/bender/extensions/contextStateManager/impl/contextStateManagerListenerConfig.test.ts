// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { IContextStateManager, ContextStateManager, ContextStateManagerListenerConfig } from "../../../../../../src";

import { StateRegistry } from "../../../../../../src/robotlegs/bender/extensions/stateManager/impl/StateRegistry";
import { StateManager } from "../../../../../../src/robotlegs/bender/extensions/stateManager/impl/StateManager";

describe("ContextStateManagerListenerConfig", () => {
    let game: Phaser.Game;
    let contextStateManager: IContextStateManager;
    let stateRegistry: StateRegistry;
    let stateManager: StateManager;
    let contextStateManagerListenerConfig: ContextStateManagerListenerConfig;

    beforeEach(() => {
        game = new Phaser.Game();
        contextStateManager = new ContextStateManager(game.state);
        stateRegistry = new StateRegistry();
        stateManager = new StateManager(stateRegistry);
        contextStateManagerListenerConfig = new ContextStateManagerListenerConfig(contextStateManager, stateManager);
    });

    afterEach(() => {
        game = null;
        contextStateManager = null;
        stateRegistry = null;
        stateManager = null;
        contextStateManagerListenerConfig = null;
    });

    it("container_is_added_to_view_manager", () => {
        contextStateManagerListenerConfig.configure();
        assert.deepEqual(stateManager.stateManagers, [game.state]);
    });
});
