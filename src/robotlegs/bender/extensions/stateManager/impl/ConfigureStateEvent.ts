// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------


/**
 * View Configuration Event
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

    private _state: any;

    /**
     * The state instance associated with this event
     */
    public get state(): any {
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
    constructor(type: string, state?: any) {
        // super(type, true, true);
        super(type);
        this._state = state;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): Event {
        return new ConfigureStateEvent(this.type, this._state);
    }
}
