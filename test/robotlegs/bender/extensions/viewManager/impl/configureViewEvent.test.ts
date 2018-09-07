// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";
import { ConfigureViewEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ConfigureViewEvent";

describe("ConfigureViewEvent", () => {
    let event: ConfigureViewEvent = null;

    beforeEach(() => {
        event = new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW);
    });

    afterEach(() => {
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(ConfigureViewEvent.CONFIGURE_VIEW, "configureView");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, ConfigureViewEvent.CONFIGURE_VIEW);
    });

    it("event_is_cloned", () => {
        let clone: ConfigureViewEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.notEqual(clone, event);
    });
});
