// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { ISceneHandler } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/api/ISceneHandler";
import { SceneManagerEvent } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/impl/SceneManagerEvent";
import "../../../../../entry";
import { CallbackStateHandler } from "../support/CallbackStateHandler";

describe("StateManagerEvent", () => {
    let game: Phaser.Game = null;
    let handler: ISceneHandler = null;
    let event: SceneManagerEvent = null;

    beforeEach(() => {
        game = new Phaser.Game();
        handler = new CallbackStateHandler();
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
        assert.equal(SceneManagerEvent.HANDLER_ADD, "handlerAdd");
        assert.equal(SceneManagerEvent.HANDLER_REMOVE, "handlerRemove");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, SceneManagerEvent.SCENE_MANAGER_ADD);
    });

    it("stateManager_is_stored", () => {
        assert.equal(event.sceneManager, game.scene);
    });

    it("handler_is_stored", () => {
        assert.equal(event.handler, handler);
    });

    it("event_is_cloned", () => {
        let clone: SceneManagerEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.sceneManager, event.sceneManager);
        assert.equal(clone.handler, event.handler);
        assert.notEqual(clone, event);
    });
});
