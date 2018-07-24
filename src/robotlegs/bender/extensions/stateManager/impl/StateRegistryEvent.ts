// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * StateManager existence event
 * @private
 */
import { Event } from "@robotlegsjs/core";

export class StateRegistryEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static STATE_MANAGER_ADD: string = "stateManagerAdd";

    public static STATE_MANAGER_REMOVE: string = "stateManagerRemove";

    public static ROOT_STATE_MANAGER_ADD: string = "rootStateManagerAdd";

    public static ROOT_STATE_MANAGER_REMOVE: string = "rootStateManagerRemove";

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

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a new stateManager existence event
     * @param type The event type
     * @param stateManager The stateManager associated with this event
     */
    constructor(type: string, stateManager: Phaser.StateManager) {
        super(type);
        this._stateManager = stateManager;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): StateRegistryEvent {
        return new StateRegistryEvent(this.type, this._stateManager);
    }
}
