// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "inversify";

import { IConfig } from "@robotlegsjs/core";

import { IContextStateManager } from "../api/IContextStateManager";
import { IStateManager } from "../../stateManager/api/IStateManager";

/**
 * This configuration file adds the ContextStateManager to the stateManager.
 *
 * It requires that the StateManagerExtension, ContextStateManagerExtension
 * and a ContextStateManager have been installed.
 */
@injectable()
export class ContextStateManagerListenerConfig implements IConfig {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _contextStateManager: IContextStateManager;

    private _stateManager: IStateManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    constructor(
        @inject(IContextStateManager) contextStateManager: IContextStateManager,
        @inject(IStateManager) stateManager: IStateManager
    ) {
        this._contextStateManager = contextStateManager;
        this._stateManager = stateManager;
    }

    /**
     * @inheritDoc
     */
    public configure(): void {
        // Adds the StateManager to the View Manager at startup
        this._stateManager.addStateManager(
            this._contextStateManager.stateManager
        );
    }
}
