// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { IContextSceneManager } from "../../../../../../src/robotlegs/bender/extensions/contextSceneManager/api/IContextSceneManager";
import { ContextSceneManager } from "../../../../../../src/robotlegs/bender/extensions/contextSceneManager/impl/ContextSceneManager";
import { ContextSceneManagerListenerConfig } from "../../../../../../src/robotlegs/bender/extensions/contextSceneManager/impl/ContextSceneManagerListenerConfig";

import { SceneManager } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/impl/SceneManager";
import { SceneRegistry } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/impl/SceneRegistry";

describe("ContextSceneManagerListenerConfig", () => {
    let game: Phaser.Game;
    let contextSceneManager: IContextSceneManager;
    let sceneRegistry: SceneRegistry;
    let sceneManager: SceneManager;
    let contextSceneManagerListenerConfig: ContextSceneManagerListenerConfig;

    beforeEach(() => {
        game = new Phaser.Game();
        contextSceneManager = new ContextSceneManager(game.scene);
        sceneRegistry = new SceneRegistry();
        sceneManager = new SceneManager(sceneRegistry);
        contextSceneManagerListenerConfig = new ContextSceneManagerListenerConfig(contextSceneManager, sceneManager);
    });

    afterEach(() => {
        game = null;
        contextSceneManager = null;
        sceneRegistry = null;
        sceneManager = null;
        contextSceneManagerListenerConfig = null;
    });

    it("container_is_added_to_view_manager", () => {
        contextSceneManagerListenerConfig.configure();
        assert.deepEqual(sceneManager.sceneManagers, [game.scene]);
    });
});
