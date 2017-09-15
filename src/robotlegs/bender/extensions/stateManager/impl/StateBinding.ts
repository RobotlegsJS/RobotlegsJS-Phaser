// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { EventDispatcher } from "@robotlegsjs/core";

import { IStateHandler } from "../api/IStateHandler";

import { StateBindingEvent } from "./StateBindingEvent";

/**
 * @private
 */
export class StateBinding extends EventDispatcher {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _parent: StateBinding;

    /**
     * @private
     */
    public get parent(): StateBinding {
        return this._parent;
    }

    /**
     * @private
     */
    public set parent(value: StateBinding) {
        this._parent = value;
    }

    private _container: any;

    /**
     * @private
     */
    public get container(): any {
        return this._container;
    }

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _handlers: IStateHandler[] = [];

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(container: any) {
        super();
        this._container = container;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addHandler(handler: IStateHandler): void {
        if (this._handlers.indexOf(handler) > -1) {
            return;
        }
        this._handlers.push(handler);
    }

    /**
     * @private
     */
    public removeHandler(handler: IStateHandler): void {
        let index: number = this._handlers.indexOf(handler);
        if (index > -1) {
            this._handlers.splice(index, 1);
            if (this._handlers.length === 0) {
                this.dispatchEvent(
                    new StateBindingEvent(StateBindingEvent.BINDING_EMPTY)
                );
            }
        }
    }

    /**
     * @private
     */
    public handleState(state: any, type: FunctionConstructor): void {
        let length: number = this._handlers.length;
        for (let i: number = 0; i < length; i++) {
            let handler: IStateHandler = <IStateHandler>this._handlers[i];
            handler.handleState(state, type);
        }
    }
}
