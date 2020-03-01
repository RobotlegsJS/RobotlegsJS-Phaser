// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, EventMap } from "@robotlegsjs/core";

import { IEventEmitterMap } from "../api/IEventEmitterMap";
import { EventEmitterMapConfig } from "./EventEmitterMapConfig";

/**
 * @private
 */
@injectable()
export class EventEmitterMap extends EventMap implements IEventEmitterMap {
    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    protected _eventEmitterListeners: EventEmitterMapConfig[] = [];
    protected _suspendedEventEmitterListeners: EventEmitterMapConfig[] = [];

    protected get _currentEventEmitterListeners(): EventEmitterMapConfig[] {
        return this._suspended ? this._suspendedEventEmitterListeners : this._eventEmitterListeners;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public on(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void {
        this._registerEventEmitterListener(emitter, event, listener, context);
    }

    /**
     * @inheritDoc
     */
    public once(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void {
        this._registerEventEmitterListener(emitter, event, listener, context, true);
    }

    /**
     * @inheritDoc
     */
    public off(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context?: any): void {
        this._unregisterEventEmitterListener(emitter, event, listener, context);
    }

    /**
     * @inheritDoc
     */
    public unmapEventEmitterListeners(): void {
        let eventConfig: EventEmitterMapConfig;

        while (this._currentEventEmitterListeners.length) {
            eventConfig = this._currentEventEmitterListeners[this._currentEventEmitterListeners.length - 1];
            this._unregisterEventEmitterListener(eventConfig.emitter, eventConfig.event, eventConfig.listener, eventConfig.context);
        }
    }

    /**
     * @inheritDoc
     */
    public unmapAllListeners(): void {
        super.unmapAllListeners();

        this.unmapEventEmitterListeners();
    }

    /**
     * @inheritDoc
     */
    public suspend(): void {
        if (this._suspended) {
            return;
        }

        // Handle Phaser.Events.EventEmitter's
        let emitter: Phaser.Events.EventEmitter;

        this._eventEmitterListeners.forEach((eventConfig: EventEmitterMapConfig) => {
            emitter = eventConfig.emitter;
            if (eventConfig.once) {
                emitter.off(eventConfig.event, eventConfig.calback, eventConfig.context, eventConfig.once);
            } else {
                emitter.off(eventConfig.event, eventConfig.listener, eventConfig.context, eventConfig.once);
            }
            this._suspendedEventEmitterListeners.push(eventConfig);
        });

        this._eventEmitterListeners = [];

        super.suspend();
    }

    /**
     * @inheritDoc
     */
    public resume(): void {
        if (!this._suspended) {
            return;
        }

        // Handle Phaser.Events.EventEmitter's
        let emitter: Phaser.Events.EventEmitter;

        this._suspendedEventEmitterListeners.forEach((eventConfig: EventEmitterMapConfig) => {
            emitter = eventConfig.emitter;
            if (eventConfig.once) {
                emitter.once(eventConfig.event, eventConfig.calback, eventConfig.context);
            } else {
                emitter.on(eventConfig.event, eventConfig.listener, eventConfig.context);
            }
            this._eventEmitterListeners.push(eventConfig);
        });

        this._suspendedEventEmitterListeners = [];

        super.resume();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected _registerEventEmitterListener(
        emitter: Phaser.Events.EventEmitter,
        event: string | symbol,
        listener: Function,
        context?: any,
        once?: boolean
    ): void {
        let config: EventEmitterMapConfig;

        let i: number = this._currentEventEmitterListeners.length;
        while (i--) {
            config = this._currentEventEmitterListeners[i];
            if (config.equalTo(emitter, event, listener, context)) {
                return;
            }
        }

        if (once) {
            config = new EventEmitterMapConfig(emitter, event, listener, context, once);
            config.calback = this._onceCallback(config);
        } else {
            config = new EventEmitterMapConfig(emitter, event, listener, context);
        }

        this._currentEventEmitterListeners.push(config);

        if (!this._suspended) {
            if (once) {
                emitter.once(event, config.calback, context);
            } else {
                emitter.on(event, listener, context);
            }
        }
    }

    protected _onceCallback(eventConfig: EventEmitterMapConfig): Function {
        return (...args: any[]): void => {
            let i: number = this._currentEventEmitterListeners.length;

            while (i--) {
                let config: EventEmitterMapConfig = this._currentEventEmitterListeners[i];
                if (config.equalTo(eventConfig.emitter, eventConfig.event, eventConfig.listener, eventConfig.context)) {
                    this._currentEventEmitterListeners.splice(i, 1);
                    eventConfig.listener.apply(eventConfig.context, args);
                    return;
                }
            }
        };
    }

    protected _unregisterEventEmitterListener(
        emitter: Phaser.Events.EventEmitter,
        event: string | symbol,
        listener: Function,
        context?: any
    ): void {
        let i: number = this._currentEventEmitterListeners.length;
        while (i--) {
            let config: EventEmitterMapConfig = this._currentEventEmitterListeners[i];
            if (config.equalTo(emitter, event, listener, context)) {
                if (!this._suspended) {
                    if (config.once) {
                        emitter.off(event, config.calback, config.context, config.once);
                    } else {
                        emitter.off(event, config.listener, config.context, config.once);
                    }
                }
                this._currentEventEmitterListeners.splice(i, 1);
                return;
            }
        }
    }
}
