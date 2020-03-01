// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context } from "@robotlegsjs/core";

import { IEventEmitterMap } from "../../../../../src/robotlegs/bender/extensions/localEventEmitterMap/api/IEventEmitterMap";
import { EventEmitterMap } from "../../../../../src/robotlegs/bender/extensions/localEventEmitterMap/impl/EventEmitterMap";

import { LocalEventEmitterMapExtension } from "../../../../../src/robotlegs/bender/extensions/localEventEmitterMap/LocalEventEmitterMapExtension";

describe("LocalEventEmitterMapExtension", () => {
    let context: IContext;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context.destroy();
        context = null;
    });

    it("IEventEmitterMap_is_mapped_into_injector", () => {
        let actual: IEventEmitterMap = null;
        context.install(LocalEventEmitterMapExtension);
        context.whenInitializing(() => {
            actual = context.injector.get<IEventEmitterMap>(IEventEmitterMap);
        });
        context.initialize();
        assert.instanceOf(actual, EventEmitterMap);
    });

    it("IEventMap_generates_new_instance_on_each_request", () => {
        let eventMap1: IEventEmitterMap = null;
        let eventMap2: IEventEmitterMap = null;
        context.install(LocalEventEmitterMapExtension);
        context.whenInitializing(() => {
            eventMap1 = context.injector.get<IEventEmitterMap>(IEventEmitterMap);
            eventMap2 = context.injector.get<IEventEmitterMap>(IEventEmitterMap);
        });
        context.initialize();
        assert.instanceOf(eventMap1, EventEmitterMap);
        assert.instanceOf(eventMap2, EventEmitterMap);
        assert.notEqual(eventMap1, eventMap2);
    });
});
