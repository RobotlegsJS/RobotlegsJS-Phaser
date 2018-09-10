// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { inject, injectable, IConfig } from "@robotlegsjs/core";

import { ISceneManager } from "../../viewManager/api/ISceneManager";
import { IContextSceneManager } from "../api/IContextSceneManager";

/**
 * This configuration file adds the ContextSceneManager to the sceneManager.
 *
 * It requires that the SceneManagerExtension, ContextSceneManagerExtension
 * and a ContextSceneManager have been installed.
 */
@injectable()
export class ContextSceneManagerListenerConfig implements IConfig {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _contextSceneManager: IContextSceneManager;

    private _sceneManager: ISceneManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    constructor(
        @inject(IContextSceneManager) contextSceneManager: IContextSceneManager,
        @inject(ISceneManager) sceneManager: ISceneManager
    ) {
        this._contextSceneManager = contextSceneManager;
        this._sceneManager = sceneManager;
    }

    /**
     * @inheritDoc
     */
    public configure(): void {
        // Adds the SceneManager to the View Manager at startup
        this._sceneManager.addSceneManager(this._contextSceneManager.sceneManager);
    }
}
