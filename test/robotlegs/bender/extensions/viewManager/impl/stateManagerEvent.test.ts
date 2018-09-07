// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";


import { CallbackSceneHandler } from "../support/CallbackSceneHandler";
import { ISceneHandler, IViewHandler } from "../../../../../../src";
import { SceneManagerEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/SceneManagerEvent";
import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("SceneManagerEvent", () => {
    let game: Phaser.Game = null;
    let sceneHandler: ISceneHandler = null;
    let viewHandler: IViewHandler = null; 
    let event: SceneManagerEvent = null;

    beforeEach(() => {
        game = new Phaser.Game();
        sceneHandler = new CallbackSceneHandler();
        viewHandler = new CallbackViewHandler();
        event = new SceneManagerEvent(SceneManagerEvent.SCENE_MANAGER_ADD, game.scene, sceneHandler, viewHandler);
    });

    afterEach(() => {
        game = null;
        sceneHandler = null;
        viewHandler = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(SceneManagerEvent.SCENE_MANAGER_ADD, "sceneManagerAdd");
        assert.equal(SceneManagerEvent.SCENE_MANAGER_REMOVE, "sceneManagerRemove");
        assert.equal(SceneManagerEvent.SCENE_HANDLER_ADD, "sceneHandlerAdd");
        assert.equal(SceneManagerEvent.SCENE_HANDLER_REMOVE, "sceneHandlerRemove");
        assert.equal(SceneManagerEvent.VIEW_HANDLER_ADD, "viewHandlerAdd");
        assert.equal(SceneManagerEvent.VIEW_HANDLER_REMOVE, "viewHandlerRemove");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, SceneManagerEvent.SCENE_MANAGER_ADD);
    });

    it("sceneManager_is_stored", () => {
        assert.equal(event.sceneManager, game.scene);
    });

    it("scene_handler_is_stored", () => {
        assert.equal(event.sceneHandler, sceneHandler);
    });

    it("view_handler_is_stored", () => {
        assert.equal(event.viewHandler, viewHandler);
    });

    it("event_is_cloned", () => {
        let clone: SceneManagerEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.sceneManager, event.sceneManager);
        assert.equal(clone.sceneHandler, event.sceneHandler);
        assert.equal(clone.viewHandler, event.viewHandler);
        assert.notEqual(clone, event);
    });
});
