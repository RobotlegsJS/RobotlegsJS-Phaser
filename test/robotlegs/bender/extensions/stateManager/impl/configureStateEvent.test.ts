// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { ConfigureSceneEvent } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/impl/ConfigureSceneEvent";

describe("ConfigureSceneEvent", () => {
    let scene: Phaser.Scene = null;
    let event: ConfigureSceneEvent = null;

    beforeEach(() => {
        scene = new Phaser.Scene("theScene");
        event = new ConfigureSceneEvent(ConfigureSceneEvent.CONFIGURE_SCENE, scene);
    });

    afterEach(() => {
        scene = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(ConfigureSceneEvent.CONFIGURE_SCENE, "configureScene");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, ConfigureSceneEvent.CONFIGURE_SCENE);
    });

    it("scene_is_stored", () => {
        assert.equal(event.scene, scene);
    });

    it("event_is_cloned", () => {
        let clone: ConfigureSceneEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.scene, event.scene);
        assert.notEqual(clone, event);
    });
});
