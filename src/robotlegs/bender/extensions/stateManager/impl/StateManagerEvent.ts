// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

import { IStateHandler } from "../api/IStateHandler";

/**
 * StateManager existence event
 * @private
 */
export class StateManagerEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static STATE_MANAGER_ADD: string = "stateManagerAdd";

    public static STATE_MANAGER_REMOVE: string = "stateManagerRemove";

    public static HANDLER_ADD: string = "handlerAdd";

    public static HANDLER_REMOVE: string = "handlerRemove";

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _stateManager: Phaser.StateManager;

    /**
     * The stateManager associated with this event
     */
    public get stateManager(): Phaser.StateManager {
        return this._stateManager;
    }

    private _handler: IStateHandler;

    /**
     * The state handler associated with this event
     */
    public get handler(): IStateHandler {
        return this._handler;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a state manager event
     * @param type The event type
     * @param stateManager The Phaser.StateManager associated with this event
     * @param handler The state handler associated with this event
     */
    constructor(type: string, stateManager?: Phaser.StateManager, handler?: IStateHandler) {
        super(type, { bubbles: true });
        this._stateManager = stateManager;
        this._handler = handler;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): StateManagerEvent {
        return new StateManagerEvent(this.type, this._stateManager, this._handler);
    }
}
