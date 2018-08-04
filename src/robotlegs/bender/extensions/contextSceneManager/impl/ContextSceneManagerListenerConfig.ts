// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig } from "@robotlegsjs/core";
import { inject, injectable } from "inversify";
import { ISceneManager } from "../../sceneManager/api/ISceneManager";
import { IContextSceneManager } from "../api/IContextSceneManager";

/**
 * This configuration file adds the ContextStateManager to the stateManager.
 *
 * It requires that the StateManagerExtension, ContextStateManagerExtension
 * and a ContextStateManager have been installed.
 */
@injectable()
export class ContextSceneManagerListenerConfig implements IConfig {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _contextStateManager: IContextSceneManager;

    private _stateManager: ISceneManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    constructor(
        @inject(IContextSceneManager) contextStateManager: IContextSceneManager,
        @inject(ISceneManager) stateManager: ISceneManager
    ) {
        this._contextStateManager = contextStateManager;
        this._stateManager = stateManager;
    }

    /**
     * @inheritDoc
     */
    public configure(): void {
        // Adds the StateManager to the View Manager at startup
        this._stateManager.addSceneManager(this._contextStateManager.sceneManager);
    }
}
