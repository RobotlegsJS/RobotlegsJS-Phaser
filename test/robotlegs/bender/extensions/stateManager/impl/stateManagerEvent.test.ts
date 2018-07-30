// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { IStateHandler } from "../../../../../../src/robotlegs/bender/extensions/stateManager/api/IStateHandler";
import { StateManagerEvent } from "../../../../../../src/robotlegs/bender/extensions/stateManager/impl/StateManagerEvent";

import { CallbackStateHandler } from "../support/CallbackStateHandler";

describe("StateManagerEvent", () => {
    let phaserStateManager: Phaser.StateManager = null;
    let handler: IStateHandler = null;
    let event: StateManagerEvent = null;

    beforeEach(() => {
        phaserStateManager = new Phaser.StateManager(null);
        handler = new CallbackStateHandler();
        event = new StateManagerEvent(StateManagerEvent.STATE_MANAGER_ADD, phaserStateManager, handler);
    });

    afterEach(() => {
        phaserStateManager = null;
        handler = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(StateManagerEvent.STATE_MANAGER_ADD, "stateManagerAdd");
        assert.equal(StateManagerEvent.STATE_MANAGER_REMOVE, "stateManagerRemove");
        assert.equal(StateManagerEvent.HANDLER_ADD, "handlerAdd");
        assert.equal(StateManagerEvent.HANDLER_REMOVE, "handlerRemove");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, StateManagerEvent.STATE_MANAGER_ADD);
    });

    it("stateManager_is_stored", () => {
        assert.equal(event.stateManager, phaserStateManager);
    });

    it("handler_is_stored", () => {
        assert.equal(event.handler, handler);
    });

    it("event_is_cloned", () => {
        let clone: StateManagerEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.stateManager, event.stateManager);
        assert.equal(clone.handler, event.handler);
        assert.notEqual(clone, event);
    });
});
