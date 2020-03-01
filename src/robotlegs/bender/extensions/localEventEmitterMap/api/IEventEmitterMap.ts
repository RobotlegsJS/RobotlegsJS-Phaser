// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEventMap } from "@robotlegsjs/core";

/**
 * The Event Emitter Map keeps track of listeners and provides the ability
 * to unregister all Phaser.Events.EventEmitter listeners with a single method call.
 */
export const IEventEmitterMap = Symbol("IEventEmitterMap");
export interface IEventEmitterMap extends IEventMap {
    /**
     * The same as calling `on` or `addListener` directly on the `Phaser.Events.EventEmitter`,
     * but keeps a list of listeners for easy (usually automatic) removal.
     *
     * @param emitter The `Phaser.Events.EventEmitter` to listen to
     * @param event The `event` type to listen for
     * @param listener The `event` handler
     * @param context the listener function's "this"
     */
    on(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void;

    /**
     * The same as calling `once` directly on the `Phaser.Events.EventEmitter`,
     * but keeps a list of listeners for easy (usually automatic) removal.
     *
     * @param emitter The `Phaser.Events.EventEmitter` to listen to
     * @param event The `event` type to listen for
     * @param listener The `event` handler
     * @param context the listener function's "this"
     */
    once(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void;

    /**
     * The same as calling `off` or `removeListener` directly on the `Phaser.Events.EventEmitter`,
     * but updates our local list of listeners.
     *
     * @param emitter The `Phaser.Events.EventEmitter` to listen to
     * @param event The `event` type to listen for
     * @param listener The `event` handler
     * @param context the listener function's "this"
     */
    off(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener?: Function, context?: any): void;

    /**
     * Removes all listeners registered through `on` or `once`
     */
    unmapEventEmitterListeners(): void;
}
