// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { ContextSceneManager, ContextSceneManagerListenerConfig, IContextSceneManager } from "../../../../../../src";
import { SceneManager } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/impl/SceneManager";
import { SceneRegistry } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/impl/SceneRegistry";
import "../../../../../entry";

describe("ContextStateManagerListenerConfig", () => {
    let game: Phaser.Game;
    let contextStateManager: IContextSceneManager;
    let sceneRegistry: SceneRegistry;
    let sceneManager: SceneManager;
    let contextStateManagerListenerConfig: ContextSceneManagerListenerConfig;

    beforeEach(() => {
        game = new Phaser.Game();
        contextStateManager = new ContextSceneManager(game.scene);
        sceneRegistry = new SceneRegistry();
        sceneManager = new SceneManager(sceneRegistry);
        contextStateManagerListenerConfig = new ContextSceneManagerListenerConfig(contextStateManager, sceneManager);
    });

    afterEach(() => {
        game = null;
        contextStateManager = null;
        sceneRegistry = null;
        sceneManager = null;
        contextStateManagerListenerConfig = null;
    });

    it("container_is_added_to_view_manager", () => {
        contextStateManagerListenerConfig.configure();
        assert.deepEqual(sceneManager.sceneManagers, [game.scene]);
    });
});
