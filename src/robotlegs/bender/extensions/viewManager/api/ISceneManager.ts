// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEventDispatcher } from "@robotlegsjs/core";

import { ISceneHandler} from "./ISceneHandler";
import { IViewHandler } from "./IViewHandler";

/**
 * The Scene Manager allows you to add multiple "scene managers" to a context
 */
export let ISceneManager = Symbol("ISceneManager");
export interface ISceneManager extends IEventDispatcher {
    /**
     * A list of currently registered SceneManagers
     */
    sceneManagers: Phaser.Scenes.SceneManager[];

    /**
     * Adds a SceneManager as a "scene root" into the context
     * @param sceneManager
     */
    addSceneManager(sceneManager: Phaser.Scenes.SceneManager): void;

    /**
     * Removes a sceneManager from this context
     * @param sceneManager
     */
    removeSceneManager(sceneManager: Phaser.Scenes.SceneManager): void;

    /**
     * Registers a scene handler
     * @param handler
     */
    addSceneHandler(handler: ISceneHandler): void;

    /**
     * Removes a scene handler
     * @param handler
     */
    removeSceneHandler(handler: ISceneHandler): void;


    /**
     * Registers a view handler
     * @param handler
     */
    addViewHandler(handler: IViewHandler): void;

    /**
     * Removes a view handler
     * @param handler
     */
    removeViewHandler(handler: IViewHandler): void;

    /**
     * Removes all scene and view handlers from this context
     */
    removeAllHandlers(): void;
}
