// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IClass, IEvent, IEventDispatcher, Event } from "@robotlegsjs/core";

import { IMediator } from "../api/IMediator";

import { IEventEmitterMap } from "../../localEventEmitterMap/api/IEventEmitterMap";

/**
 * Abstract mediator implementation used by <code>SceneMediator</code> and <code>ViewMediator</code> classes.
 */
@injectable()
export abstract class AbstractMediator implements IMediator {
    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    @inject(IEventEmitterMap)
    protected _eventEmitterMap: IEventEmitterMap;

    @inject(IEventDispatcher)
    protected _eventDispatcher: IEventDispatcher;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public abstract initialize(): void;

    /**
     * @inheritDoc
     */
    public abstract destroy(): void;

    /**
     * Runs after the mediator has been destroyed.
     * Cleans up listeners mapped through the local EventEmitterMap.
     */
    public postDestroy(): void {
        this._eventEmitterMap.unmapListeners();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    /**
     * Use this method to listen for events dispatched by the <code>Phaser.Events.EventEmitter</code>.
     * All the registered listeners will be automatically removed when this mediator is destroyed.
     *
     * Call this method is the same as calling <code>on</code> or <code>addListener</code> directly on the
     * <code>Phaser.Events.EventEmitter</code>, but keeps a list of listeners for easy (usually automatic) removal.
     *
     * The <code>context</code> will be automatically mapped to <code>this</code> when no context information is provided.
     *
     * @param emitter The <code>Phaser.Events.EventEmitter</code> to listen to
     * @param event The <code>event</code> type to listen for
     * @param listener The <code>event</code> handler
     * @param context The listener function's "this"
     */
    protected on(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void {
        this._eventEmitterMap.on(emitter, event, listener, context || this);
    }

    /**
     * Use this method to listen for events dispatched by the <code>Phaser.Events.EventEmitter</code>.
     * All the registered listeners will be automatically removed when this mediator is destroyed.
     *
     * Call this method is the same as calling <code>once</code> directly on the
     * <code>Phaser.Events.EventEmitter</code>, but keeps a list of listeners for easy (usually automatic) removal.
     *
     * The <code>context</code> will be automatically mapped to <code>this</code> when no context information is provided.
     *
     * @param emitter The <code>Phaser.Events.EventEmitter</code> to listen to
     * @param event The <code>event</code> type to listen for
     * @param listener The <code>event</code> handler
     * @param context The listener function's "this"
     */
    protected once(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void {
        this._eventEmitterMap.once(emitter, event, listener, context || this);
    }

    /**
     * Use this method to remove listeners from events dispatched by the <code>Phaser.Events.EventEmitter</code>.
     *
     * Call this method is the same as calling <code>off</code> directly on the
     * <code>Phaser.Events.EventEmitter</code> emitter, but updates our local list of listeners.
     *
     * The <code>context</code> will be automatically mapped to <code>this</code> when no context information is provided.
     *
     * @param emitter The <code>Phaser.Events.EventEmitter</code> to listen to
     * @param event The <code>event</code> type to listen for
     * @param listener The <code>event</code> handler
     * @param contextt The listener function's "this"
     */
    protected off(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void {
        this._eventEmitterMap.off(emitter, event, listener, context || this);
    }

    /**
     * Use this method to listen for events dispatched by the <code>EventDispatcher/code> provided by RobotlegsJS core.
     *
     * Call this method is the same as calling <code>addEventListener</code> directly on the
     * <code>EventDispatcher</code>, but keeps a list of listeners for easy (usually automatic) removal.
     *
     * The <code>context</code> will be automatically set to <code>this</code> when no context information is provided.
     *
     * @param event The <code>event</code> type to listen for
     * @param listener The <code>event</code> handler
     * @param context The listener function's "this"
     * @param eventClass Optional Event class for a stronger mapping.
     * @param useCapture Determines whether the listener works in the capture phase or the bubbling phases.
     * @param priority The priority level of the event listener.
     */
    protected addContextListener(
        event: string,
        listener: Function,
        context?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean,
        priority?: number
    ): void {
        this._eventEmitterMap.mapListener(this._eventDispatcher, event, listener, context || this, eventClass, useCapture, priority);
    }

    /**
     * Use this method to remove listeners from events dispatched by the <code>EventDispatcher/code> provided by RobotlegsJS core.
     *
     * Call this method is the same as calling <code>removeEventListener</code> directly on the
     * <code>EventDispatcher</code>, but updates our local list of listeners.
     *
     * The <code>context</code> will be automatically set to <code>this</code> when no context information is provided.
     *
     * @param event The <code>event</code> type to listen for
     * @param listener The <code>event</code> handler
     * @param context The listener function's "this"
     * @param eventClass Optional Event class for a stronger mapping.
     * @param useCapture Determines whether the listener works in the capture phase or the bubbling phases.
     * @param priority The priority level of the event listener.
     */
    protected removeContextListener(
        event: string,
        listener: Function,
        context?: any,
        eventClass?: IClass<IEvent>,
        useCapture?: boolean
    ): void {
        this._eventEmitterMap.unmapListener(this._eventDispatcher, event, listener, context || this, eventClass, useCapture);
    }

    /**
     * Use this method to listen for DOM events dispatched by the provided <code>EventTarget/code>.
     *
     * Call this method is the same as calling <code>addEventListener</code> directly on the
     * <code>EventTarget</code>, but keeps a list of listeners for easy (usually automatic) removal.
     *
     * @param eventTarget The <code>EventTarget</code> to listen to
     * @param event The <code>Event</code> type to listen for
     * @param listener The <code>Event</code> handler
     * @param options An options object that specifies characteristics about the event listener
     */
    protected addDomListener(
        eventTarget: EventTarget,
        event: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void {
        this._eventEmitterMap.mapDomListener(eventTarget, event, listener, options);
    }

    /**
     * Use this method to remove listeners from DOM events dispatched by the provided <code>EventTarget/code>.
     *
     * Call this method is the same as calling <code>removeEventListener</code> directly on the
     * <code>EventTarget</code>, but updates our local list of listeners.
     *
     * @param dispatcher The <code>EventTarget</code>
     * @param event The <code>Event</code> type
     * @param listener The <code>Event</code> handler
     * @param options An options object that specifies characteristics about the event listener
     */
    protected removeDomListener(eventTarget: EventTarget, event: string, listener: EventListenerOrEventListenerObject): void {
        this._eventEmitterMap.unmapDomListener(eventTarget, event, listener);
    }

    /**
     * Use this method to dispatch events to the Robotlegs context through the <code>EventDispatcher/code> provided by RobotlegsJS core.
     *
     * Call this method to trigger the execution of commands, call external services or communicate with other mediators.
     *
     * @param event The <code>Event</code> to dispatch
     */
    protected dispatch(event: Event): void {
        this._eventDispatcher.dispatchEvent(event);
    }
}
