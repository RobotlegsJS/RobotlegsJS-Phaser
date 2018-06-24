// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { StateBindingEvent } from "../../../../../../src/robotlegs/bender/extensions/stateManager/impl/StateBindingEvent";

describe("StateBindingEvent", () => {
    let event: StateBindingEvent = null;

    beforeEach(() => {
        event = new StateBindingEvent(StateBindingEvent.BINDING_EMPTY);
    });

    afterEach(() => {
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(StateBindingEvent.BINDING_EMPTY, "bindingEmpty");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, StateBindingEvent.BINDING_EMPTY);
    });

    it("event_is_cloned", () => {
        let clone: StateBindingEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.notEqual(clone, event);
    });
});
