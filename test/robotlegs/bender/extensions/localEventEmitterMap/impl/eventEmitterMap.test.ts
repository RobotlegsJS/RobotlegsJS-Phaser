// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { IEventEmitterMap } from "../../../../../../src/robotlegs/bender/extensions/localEventEmitterMap/api/IEventEmitterMap";
import { EventEmitterMap } from "../../../../../../src/robotlegs/bender/extensions/localEventEmitterMap/impl/EventEmitterMap";

describe("EventEmitterMap", () => {
    const STARTED: string = "started";
    const CHANGED: string = "changed";
    const COMPLETED: string = "completed";

    let eventEmitter: Phaser.Events.EventEmitter;
    let eventEmitterMap: IEventEmitterMap;

    let listenerExecuted: boolean = false;
    let listenerExecutedCount: number = 0;

    beforeEach(() => {
        eventEmitter = new Phaser.Events.EventEmitter();
        eventEmitterMap = new EventEmitterMap();
    });

    afterEach(() => {
        resetListenerExecuted();
        resetListenerExecutedCount();
    });

    function listener(): void {
        listenerExecuted = true;
    }

    function resetListenerExecuted(): void {
        listenerExecuted = false;
    }

    function listenerWithCounter(): void {
        listenerExecutedCount++;
    }

    function resetListenerExecutedCount(): void {
        listenerExecutedCount = 0;
    }

    it("listener_mapped_is_triggered", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listener);
        eventEmitter.emit(STARTED);
        assert.isTrue(listenerExecuted);
    });

    it("once_listener_mapped_is_triggered", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listener);
        eventEmitter.emit(STARTED);
        assert.isTrue(listenerExecuted);
    });

    it("listener_mapped_is_triggered_multiple_times_when_event_fires_multiple_times", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 3);
    });

    it("once_listener_mapped_is_triggered_only_one_time_when_event_fires_multiple_times", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 1);
    });

    it("listener_mapped_twice_only_fires_once", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter, this);
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter, this);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 1);
    });

    it("once_listener_mapped_twice_only_fires_once", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter, this);
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter, this);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 1);
    });

    it("listener_mapped_and_unmapped_doesnt_fire", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listener);
        eventEmitterMap.off(eventEmitter, STARTED, listener);
        eventEmitter.emit(STARTED);
        assert.isFalse(listenerExecuted);
    });

    it("once_listener_mapped_and_unmapped_doesnt_fire", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listener);
        eventEmitterMap.off(eventEmitter, STARTED, listener);
        eventEmitter.emit(STARTED);
        assert.isFalse(listenerExecuted);
    });

    it("multiple_once_listeners_are_triggered_only_one_time_when_event_fires_multiple_times", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(CHANGED);
        eventEmitter.emit(CHANGED);
        eventEmitter.emit(CHANGED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(COMPLETED);
        assert.equal(listenerExecutedCount, 3);
    });

    it("multiple_once_listeners_added_multiple_times_are_triggered_only_one_time_when_event_fires_multiple_times", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(CHANGED);
        eventEmitter.emit(CHANGED);
        eventEmitter.emit(CHANGED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(COMPLETED);
        assert.equal(listenerExecutedCount, 3);
    });

    it("unmap_listener_that_was_not_mapped_have_no_effect", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.off(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 1);
    });

    it("listener_mapped_twice_and_removed_once_doesnt_fire", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter, this);
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter, this);
        eventEmitterMap.off(eventEmitter, STARTED, listenerWithCounter, this);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 0);
    });

    it("unmapEventEmitterListeners_causes_no_handlers_to_fire", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listener);
        eventEmitterMap.on(eventEmitter, COMPLETED, listener);
        eventEmitterMap.once(eventEmitter, CHANGED, listener);
        eventEmitterMap.unmapEventEmitterListeners();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("suspend_causes_no_handlers_to_fire", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listener);
        eventEmitterMap.on(eventEmitter, COMPLETED, listener);
        eventEmitterMap.once(eventEmitter, CHANGED, listener);
        eventEmitterMap.suspend();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("call_suspend_when_mapper_is_suspended_have_no_effet_for_on_handlers", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listener);
        eventEmitterMap.on(eventEmitter, COMPLETED, listener);
        eventEmitterMap.on(eventEmitter, CHANGED, listener);
        eventEmitterMap.suspend();
        eventEmitterMap.suspend();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("call_suspend_when_mapper_is_suspended_have_no_effet_for_once_handlers", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listener);
        eventEmitterMap.once(eventEmitter, COMPLETED, listener);
        eventEmitterMap.once(eventEmitter, CHANGED, listener);
        eventEmitterMap.suspend();
        eventEmitterMap.suspend();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("suspend_then_resume_restores_handlers_to_fire_for_on_handlers", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.on(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitterMap.on(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.suspend();
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.equal(3, listenerExecutedCount);
    });

    it("suspend_then_resume_restores_once_handlers_to_fire_for_once_handlers", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.suspend();
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.equal(3, listenerExecutedCount);
    });

    it("call_resume_when_mapper_is_not_suspended_have_no_effet_for_on_handler", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listener, this);
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        assert.isTrue(listenerExecuted);
    });

    it("call_resume_when_once_mapper_is_not_suspended_have_no_effet_for_once_handler", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listener, this);
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        assert.isTrue(listenerExecuted);
    });

    it("listeners_added_while_suspended_dont_fire", () => {
        eventEmitterMap.suspend();
        eventEmitterMap.on(eventEmitter, STARTED, listener);
        eventEmitterMap.on(eventEmitter, COMPLETED, listener);
        eventEmitterMap.on(eventEmitter, CHANGED, listener);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("once_listeners_added_while_suspended_dont_fire", () => {
        eventEmitterMap.suspend();
        eventEmitterMap.once(eventEmitter, STARTED, listener);
        eventEmitterMap.once(eventEmitter, COMPLETED, listener);
        eventEmitterMap.once(eventEmitter, CHANGED, listener);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("listeners_added_while_suspended_fire_after_resume", () => {
        eventEmitterMap.suspend();
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.on(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitterMap.on(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        eventEmitterMap.resume();
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.equal(2, listenerExecutedCount);
    });

    it("once_listeners_added_while_suspended_fire_after_resume", () => {
        eventEmitterMap.suspend();
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        eventEmitterMap.resume();
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.equal(2, listenerExecutedCount);
    });

    it("listeners_can_be_unmapped_while_suspended", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.on(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitterMap.on(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.suspend();
        eventEmitterMap.off(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.equal(2, listenerExecutedCount);
    });

    it("once_listeners_can_be_unmapped_while_suspended", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, COMPLETED, listenerWithCounter);
        eventEmitterMap.once(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.suspend();
        eventEmitterMap.off(eventEmitter, CHANGED, listenerWithCounter);
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.equal(2, listenerExecutedCount);
    });

    it("all_listeners_can_be_unmapped_while_suspended", () => {
        eventEmitterMap.on(eventEmitter, STARTED, listener);
        eventEmitterMap.on(eventEmitter, COMPLETED, listener);
        eventEmitterMap.on(eventEmitter, CHANGED, listener);
        eventEmitterMap.suspend();
        eventEmitterMap.unmapEventEmitterListeners();
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("all_once_listeners_can_be_unmapped_while_suspended", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listener);
        eventEmitterMap.once(eventEmitter, COMPLETED, listener);
        eventEmitterMap.once(eventEmitter, CHANGED, listener);
        eventEmitterMap.suspend();
        eventEmitterMap.unmapEventEmitterListeners();
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("listeners_are_executed_in_order", () => {
        const expectedOrder: number[] = [0, 1, 2, 3];
        let thisObj: any = {};
        let actualOrder: number[] = [];
        eventEmitterMap.on(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(0);
            },
            thisObj
        );
        eventEmitterMap.on(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(1);
            },
            thisObj
        );
        eventEmitterMap.on(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(2);
            },
            thisObj
        );
        eventEmitterMap.on(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(3);
            },
            thisObj
        );
        eventEmitter.emit(STARTED);
        assert.deepEqual(actualOrder, expectedOrder);
    });

    it("once_listeners_are_executed_in_order", () => {
        const expectedOrder: number[] = [0, 1, 2, 3];
        let thisObj: any = {};
        let actualOrder: number[] = [];
        eventEmitterMap.once(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(0);
            },
            thisObj
        );
        eventEmitterMap.once(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(1);
            },
            thisObj
        );
        eventEmitterMap.once(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(2);
            },
            thisObj
        );
        eventEmitterMap.once(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(3);
            },
            thisObj
        );
        eventEmitter.emit(STARTED);
        assert.deepEqual(actualOrder, expectedOrder);
    });

    it("listeners_added_in_order_do_not_loose_order_when_event_map_is_suspended", () => {
        const expectedOrder: number[] = [0, 1, 2, 3];
        let thisObj: any = {};
        let actualOrder: number[] = [];
        eventEmitterMap.suspend();
        eventEmitterMap.on(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(0);
            },
            thisObj
        );
        eventEmitterMap.on(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(1);
            },
            thisObj
        );
        eventEmitterMap.on(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(2);
            },
            thisObj
        );
        eventEmitterMap.on(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(3);
            },
            thisObj
        );
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        assert.deepEqual(actualOrder, expectedOrder);
    });

    it("once_listeners_added_in_order_do_not_loose_order_when_event_map_is_suspended", () => {
        const expectedOrder: number[] = [0, 1, 2, 3];
        let thisObj: any = {};
        let actualOrder: number[] = [];
        eventEmitterMap.suspend();
        eventEmitterMap.once(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(0);
            },
            thisObj
        );
        eventEmitterMap.once(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(1);
            },
            thisObj
        );
        eventEmitterMap.once(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(2);
            },
            thisObj
        );
        eventEmitterMap.once(
            eventEmitter,
            STARTED,
            (e: Event) => {
                actualOrder.push(3);
            },
            thisObj
        );
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        assert.deepEqual(actualOrder, expectedOrder);
    });

    it("unmapAllListeners_remove_listeners", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listener);
        eventEmitterMap.on(eventEmitter, CHANGED, listener);
        eventEmitterMap.once(eventEmitter, COMPLETED, listener);
        eventEmitterMap.unmapAllListeners();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(COMPLETED);
        eventEmitter.emit(CHANGED);
        assert.isFalse(listenerExecuted);
    });

    it("different_listeners_added_once_for_same_event_are_triggered_only_one_time_each_one_when_event_fires_multiple_times", () => {
        let count: number = 0;
        eventEmitterMap.once(eventEmitter, STARTED, () => {
            count++;
        });
        eventEmitterMap.once(eventEmitter, STARTED, () => {
            count++;
        });
        eventEmitterMap.once(eventEmitter, STARTED, () => {
            count++;
        });
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        assert.equal(count, 3);
    });

    it("listener_added_once_when_dispatcher_is_suspended_only_fires_once_after_resume", () => {
        eventEmitterMap.suspend();
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 1);
    });

    it("once_listener_is_removed_from_current_event_emitter_listeners_after_triggered", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        eventEmitterMap.suspend();
        eventEmitterMap.resume();
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 1);
    });

    it("once_listener_unmapped_is_not_triggered", () => {
        eventEmitterMap.once(eventEmitter, STARTED, listenerWithCounter);
        eventEmitterMap.off(eventEmitter, STARTED, listenerWithCounter);
        eventEmitter.emit(STARTED);
        assert.equal(listenerExecutedCount, 0);
    });

    it("on_listeners_can_receive_parameters", () => {
        const expected: string[] = ["started", "changed:0%", "changed:50%", "changed:100%", "completed"];
        let current: string[] = [];

        eventEmitterMap.on(eventEmitter, STARTED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.on(eventEmitter, CHANGED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.on(eventEmitter, COMPLETED, (status: string) => {
            current.push(status);
        });

        eventEmitter.emit(STARTED, STARTED);
        eventEmitter.emit(CHANGED, CHANGED + ":0%");
        eventEmitter.emit(CHANGED, CHANGED + ":50%");
        eventEmitter.emit(CHANGED, CHANGED + ":100%");
        eventEmitter.emit(COMPLETED, COMPLETED);

        assert.deepEqual(current, expected);
    });

    it("once_listeners_can_receive_parameters", () => {
        const expected: string[] = ["started", "changed", "completed"];
        let current: string[] = [];

        eventEmitterMap.once(eventEmitter, STARTED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.once(eventEmitter, CHANGED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.once(eventEmitter, COMPLETED, (status: string) => {
            current.push(status);
        });

        eventEmitter.emit(STARTED, STARTED);
        eventEmitter.emit(CHANGED, CHANGED);
        eventEmitter.emit(COMPLETED, COMPLETED);

        assert.deepEqual(current, expected);
    });

    it("once_listeners_can_receive_parameters_when_emitter_is_suspended_and_resumed", () => {
        const expected: string[] = ["started", "changed", "completed"];
        let current: string[] = [];

        eventEmitterMap.once(eventEmitter, STARTED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.once(eventEmitter, CHANGED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.once(eventEmitter, COMPLETED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.suspend();
        eventEmitterMap.resume();

        eventEmitter.emit(STARTED, STARTED);
        eventEmitter.emit(CHANGED, CHANGED);
        eventEmitter.emit(COMPLETED, COMPLETED);

        assert.deepEqual(current, expected);
    });

    it("once_listeners_with_accept_parameters_are_not_triggered_when_emitter_is_suspended", () => {
        const expected: string[] = [];
        let current: string[] = [];

        eventEmitterMap.once(eventEmitter, STARTED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.once(eventEmitter, CHANGED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.once(eventEmitter, COMPLETED, (status: string) => {
            current.push(status);
        });

        eventEmitterMap.suspend();

        eventEmitter.emit(STARTED, STARTED);
        eventEmitter.emit(CHANGED, CHANGED);
        eventEmitter.emit(COMPLETED, COMPLETED);

        assert.deepEqual(current, expected);
    });
});
