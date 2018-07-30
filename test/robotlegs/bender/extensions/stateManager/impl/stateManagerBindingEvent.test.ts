// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { StateManagerBindingEvent } from "../../../../../../src/robotlegs/bender/extensions/stateManager/impl/StateManagerBindingEvent";

describe("StateManagerBindingEvent", () => {
    let event: StateManagerBindingEvent = null;

    beforeEach(() => {
        event = new StateManagerBindingEvent(StateManagerBindingEvent.BINDING_EMPTY);
    });

    afterEach(() => {
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(StateManagerBindingEvent.BINDING_EMPTY, "bindingEmpty");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, StateManagerBindingEvent.BINDING_EMPTY);
    });

    it("event_is_cloned", () => {
        let clone: StateManagerBindingEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.notEqual(clone, event);
    });
});
