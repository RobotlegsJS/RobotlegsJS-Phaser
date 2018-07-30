// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { ConfigureStateEvent } from "../../../../../../src/robotlegs/bender/extensions/stateManager/impl/ConfigureStateEvent";

describe("ConfigureStateEvent", () => {
    let state: Phaser.State = null;
    let event: ConfigureStateEvent = null;

    beforeEach(() => {
        state = new Phaser.State();
        event = new ConfigureStateEvent(ConfigureStateEvent.CONFIGURE_STATE, state);
    });

    afterEach(() => {
        state = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(ConfigureStateEvent.CONFIGURE_STATE, "configureState");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, ConfigureStateEvent.CONFIGURE_STATE);
    });

    it("state_is_stored", () => {
        assert.equal(event.state, state);
    });

    it("event_is_cloned", () => {
        let clone: ConfigureStateEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.state, event.state);
        assert.notEqual(clone, event);
    });
});
