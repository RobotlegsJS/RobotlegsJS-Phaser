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
     * The same as calling <code>on</code> or <code>addListener</code> directly on the <code>Phaser.Events.EventEmitter</code>,
     * but keeps a list of listeners for easy (usually automatic) removal.
     *
     * @param emitter The <code>Phaser.Events.EventEmitter</code> to listen to
     * @param event The <code>event</code> type to listen for
     * @param listener The <code>event</code> handler
     * @param context the listener function's "this"
     */
    on(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void;

    /**
     * The same as calling <code>once</code> directly on the <code>Phaser.Events.EventEmitter</code>,
     * but keeps a list of listeners for easy (usually automatic) removal.
     *
     * @param emitter The <code>Phaser.Events.EventEmitter</code> to listen to
     * @param event The <code>event</code> type to listen for
     * @param listener The <code>event</code> handler
     * @param context the listener function's "this"
     */
    once(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void;

    /**
     * The same as calling <code>off</code> or <code>removeListener</code> directly on the <code>Phaser.Events.EventEmitter</code>,
     * but updates our local list of listeners.
     *
     * @param emitter The <code>Phaser.Events.EventEmitter</code> to listen to
     * @param event The <code>event</code> type to listen for
     * @param listener The <code>event</code> handler
     * @param context the listener function's "this"
     */
    off(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener?: Function, context?: any): void;

    /**
     * Removes all listeners registered through <code>on</code> or <code>once</code>
     */
    unmapEventEmitterListeners(): void;
}
