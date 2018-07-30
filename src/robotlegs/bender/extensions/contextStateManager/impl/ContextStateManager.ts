// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
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

    private _stateManager: Phaser.StateManager;

    /**
     * The root Phaser.StateManager for this Context
     */
    public get stateManager(): Phaser.StateManager {
        return this._stateManager;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * The StateManager represents the root Phaser.StateManager for a Context
     * @param stateManager The root State Manager for this Context
     */
    constructor(stateManager: Phaser.StateManager) {
        if (stateManager !== null && stateManager !== undefined) {
            this._stateManager = stateManager;
        } else {
            throw new Error("StateManager can't be null or undefined");
        }
    }
}
