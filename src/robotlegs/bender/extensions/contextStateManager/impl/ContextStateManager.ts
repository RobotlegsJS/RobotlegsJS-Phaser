// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContextStateManager } from "../api/IContextStateManager";

/**
 * The Context StateManager represents the Phaser.StateManager for a Context
 */
export class ContextStateManager implements IContextStateManager {

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _stateManager: any;

    /**
     * The root Phaser.StateManager for this Context
     */
    public get stateManager(): any {
        return this._stateManager;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * The StateManager represents the root Phaser.StateManager for a Context
     * @param stateManager The root State Manager for this Context
     */
    constructor(stateManager: any) {
        this._stateManager = stateManager;
    }
}
