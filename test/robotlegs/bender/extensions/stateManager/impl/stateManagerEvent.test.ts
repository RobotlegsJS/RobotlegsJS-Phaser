// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";


import { CallbackSceneHandler } from "../support/CallbackSceneHandler";
import { ISceneHandler } from "../../../../../../src";
import { SceneManagerEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/SceneManagerEvent";

describe("SceneManagerEvent", () => {
    let game: Phaser.Game = null;
    let handler: ISceneHandler = null;
    let event: SceneManagerEvent = null;

    beforeEach(() => {
        game = new Phaser.Game();
        handler = new CallbackSceneHandler();
        event = new SceneManagerEvent(SceneManagerEvent.SCENE_MANAGER_ADD, game.scene, handler);
    });

    afterEach(() => {
        game = null;
        handler = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(SceneManagerEvent.SCENE_MANAGER_ADD, "sceneManagerAdd");
        assert.equal(SceneManagerEvent.SCENE_MANAGER_REMOVE, "sceneManagerRemove");
        assert.equal(SceneManagerEvent.SCENE_HANDLER_ADD, "sceneHandlerAdd");
        assert.equal(SceneManagerEvent.SCENE_HANDLER_REMOVE, "sceneHandlerRemove");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, SceneManagerEvent.SCENE_MANAGER_ADD);
    });

    it("sceneManager_is_stored", () => {
        assert.equal(event.sceneManager, game.scene);
    });

    it("handler_is_stored", () => {
        assert.equal(event.sceneHandler, handler);
    });

    it("event_is_cloned", () => {
        let clone: SceneManagerEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.sceneManager, event.sceneManager);
        assert.equal(clone.sceneHandler, event.sceneHandler);
        assert.notEqual(clone, event);
    });
});
