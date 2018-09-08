// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { ConfigureViewEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ConfigureViewEvent";

import { MockScene } from "../support/MockScene";

describe("ConfigureViewEvent", () => {
    let game: Phaser.Game;
    let scene: MockScene;
    let event: ConfigureViewEvent = null;

    beforeEach(() => {
        game = new Phaser.Game();
        scene = new MockScene("theScene");
        game.scene.add("theScene", scene);
        game.scene.start("theScene");

        event = new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, scene.view);
    });

    afterEach(() => {
        game = null;
        scene = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(ConfigureViewEvent.CONFIGURE_VIEW, "configureView");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, ConfigureViewEvent.CONFIGURE_VIEW);
    });

    it("view_is_stored", () => {
        assert.equal(event.view, scene.view);
    });

    it("event_is_cloned", () => {
        let clone: ConfigureViewEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.view, event.view);
        assert.notEqual(clone, event);
    });
});
