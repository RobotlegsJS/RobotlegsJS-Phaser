// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContextSceneManager } from "../api/IContextSceneManager";
import { IConfig } from "@robotlegsjs/core";

/**
 * The Context SceneManager represents the Phaser.Scenes.SceneManager for a Context
 */
export class ContextSceneManager implements IContextSceneManager, IConfig {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _sceneManager: Phaser.Scenes.SceneManager;

    /**
     * The root Phaser.Scenes.SceneManager for this Context
     */
    public get sceneManager(): Phaser.Scenes.SceneManager {
        return this._sceneManager;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * The SceneManager represents the root Phaser.Scenes.SceneManager for a Context
     * @param sceneManager The root Scene Manager for this Context
     */
    constructor(sceneManager: Phaser.Scenes.SceneManager) {
        if (sceneManager !== null && sceneManager !== undefined) {
            this._sceneManager = sceneManager;
        } else {
            throw new Error("SceneManager can't be null or undefined");
        }
    }

    /**
     *
     */
    public configure(): void {}
}
