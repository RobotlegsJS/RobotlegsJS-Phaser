// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * SceneManager existence event
 * @private
 */
import { Event } from "@robotlegsjs/core";

export class SceneRegistryEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static SCENE_MANAGER_ADD: string = "sceneManagerAdd";

    public static SCENE_MANAGER_REMOVE: string = "sceneManagerRemove";

    public static ROOT_SCENE_MANAGER_ADD: string = "rootSceneManagerAdd";

    public static ROOT_SCENE_MANAGER_REMOVE: string = "rootSceneManagerRemove";

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _sceneManager: Phaser.Scenes.SceneManager;

    /**
     * The sceneManager associated with this event
     */
    public get sceneManager(): Phaser.Scenes.SceneManager {
        return this._sceneManager;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a new sceneManager existence event
     * @param type The event type
     * @param sceneManager The sceneManager associated with this event
     */
    constructor(type: string, sceneManager: Phaser.Scenes.SceneManager) {
        super(type);
        this._sceneManager = sceneManager;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): SceneRegistryEvent {
        return new SceneRegistryEvent(this.type, this._sceneManager);
    }
}
