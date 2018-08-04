// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { assert } from "chai";
import { SceneManagerBindingEvent } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/impl/SceneManagerBindingEvent";
import "../../../../../entry";

describe("StateBindingEvent", () => {
    let event: SceneManagerBindingEvent = null;

    beforeEach(() => {
        event = new SceneManagerBindingEvent(SceneManagerBindingEvent.BINDING_EMPTY);
    });

    afterEach(() => {
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(SceneManagerBindingEvent.BINDING_EMPTY, "bindingEmpty");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, SceneManagerBindingEvent.BINDING_EMPTY);
    });

    it("event_is_cloned", () => {
        let clone: SceneManagerBindingEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.notEqual(clone, event);
    });
});
