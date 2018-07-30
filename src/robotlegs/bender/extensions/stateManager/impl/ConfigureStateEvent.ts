// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

/**
 * State Configuration Event
 * @private
 */
export class ConfigureStateEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static CONFIGURE_STATE: string = "configureState";

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _state: Phaser.State;

    /**
     * The state instance associated with this event
     */
    public get state(): Phaser.State {
        return this._state;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a state configuration event
     * @param type The event type
     * @param state The associated state instance
     */
    constructor(type: string, state?: Phaser.State) {
        super(type, { bubbles: true });
        this._state = state;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): ConfigureStateEvent {
        return new ConfigureStateEvent(this.type, this._state);
    }
}
