// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { EventEmitterMapConfig } from "../../../../../../src/robotlegs/bender/extensions/localEventEmitterMap/impl/EventEmitterMapConfig";

describe("EventEmitterMapConfig", () => {
    const EMITTER: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
    const EVENT_STRING: string = "myEvent";
    const EVENT_SYMBOL: symbol = Symbol("myEvent");
    const LISTENER: Function = () => {
        console.log("do nothing");
    };
    const CONTEXT: any = this;
    const ONCE: boolean = true;
    const CALLBACK: Function = () => {
        console.log("callback");
    };

    let instance: EventEmitterMapConfig;

    before(() => {
        instance = new EventEmitterMapConfig(EMITTER, EVENT_STRING, LISTENER, CONTEXT, ONCE);
    });

    after(() => {
        instance = null;
    });

    it("can_be_instantiated", () => {
        assert.instanceOf(instance, EventEmitterMapConfig);
    });

    it("get_dispatcher", () => {
        assert.equal(instance.emitter, EMITTER);
    });

    it("get_event", () => {
        assert.equal(instance.event, EVENT_STRING);
    });

    it("get_listener", () => {
        assert.equal(instance.listener, LISTENER);
    });

    it("get_context", () => {
        assert.equal(instance.context, CONTEXT);
    });

    it("get_once", () => {
        assert.equal(instance.once, ONCE);
    });

    it("callback_is_stored_and_recovered", () => {
        instance.calback = CALLBACK;
        assert.equal(instance.calback, CALLBACK);
    });

    it("equalTo_validate_same_instance", () => {
        assert.isTrue(instance.equalTo(EMITTER, EVENT_STRING, LISTENER, CONTEXT));
    });

    it("equalTo_do_not_accept_different_dispatcher", () => {
        assert.isFalse(instance.equalTo(new Phaser.Events.EventEmitter(), EVENT_STRING, LISTENER, CONTEXT));
    });

    it("equalTo_do_not_accept_different_event_string", () => {
        assert.isFalse(instance.equalTo(EMITTER, "anotherEvent", LISTENER, CONTEXT));
    });

    it("equalTo_do_not_accept_different_event_symbol", () => {
        assert.isFalse(instance.equalTo(EMITTER, EVENT_SYMBOL, LISTENER, CONTEXT));
    });

    it("equalTo_do_not_accept_different_listener", () => {
        assert.isFalse(
            instance.equalTo(
                EMITTER,
                EVENT_STRING,
                () => {
                    console.log("Call me crazy!");
                },
                CONTEXT
            )
        );
    });

    it("equalTo_do_not_accept_different_context_object", () => {
        assert.isFalse(instance.equalTo(EMITTER, EVENT_STRING, LISTENER, {}));
    });

    it("equalTo_do_not_accept_different_instance", () => {
        assert.isFalse(
            instance.equalTo(
                new Phaser.Events.EventEmitter(),
                "anotherEvent",
                () => {
                    console.log("Call me crazy!");
                },
                {}
            )
        );
    });

    it("equalTo_do_not_accept_different_instance", () => {
        const anotherInstance: EventEmitterMapConfig = new EventEmitterMapConfig(
            new Phaser.Events.EventEmitter(),
            Symbol("myEvent"),
            () => {
                console.log("Call me crazy!");
            },
            {},
            false
        );
        assert.isFalse(instance.equalTo(anotherInstance.emitter, anotherInstance.event, anotherInstance.listener, anotherInstance.context));
    });
});
