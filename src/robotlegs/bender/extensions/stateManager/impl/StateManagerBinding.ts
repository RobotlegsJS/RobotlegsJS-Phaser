// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, EventDispatcher } from "@robotlegsjs/core";

import { IStateHandler } from "../api/IStateHandler";

import { StateManagerBindingEvent } from "./StateManagerBindingEvent";

/**
 * @private
 */
export class StateManagerBinding extends EventDispatcher {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _parent: StateManagerBinding;

    /**
     * @private
     */
    public get parent(): StateManagerBinding {
        return this._parent;
    }

    /**
     * @private
     */
    public set parent(value: StateManagerBinding) {
        this._parent = value;
    }

    private _stateManager: Phaser.StateManager;

    /**
     * @private
     */
    public get stateManager(): Phaser.StateManager {
        return this._stateManager;
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
    constructor(stateManager: Phaser.StateManager) {
        super();
        this._stateManager = stateManager;
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
                this.dispatchEvent(new StateManagerBindingEvent(StateManagerBindingEvent.BINDING_EMPTY));
            }
        }
    }

    /**
     * @private
     */
    public handleState(state: Phaser.State, type: IClass<any>): void {
        this._handlers.forEach((handler: IStateHandler) => {
            handler.handleState(state, type);
        });
    }
}
