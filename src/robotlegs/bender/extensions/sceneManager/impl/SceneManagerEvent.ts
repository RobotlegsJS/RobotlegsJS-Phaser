// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import * as Phaser from "phaser";

import { Event } from "@robotlegsjs/core";

import { ISceneHandler } from "../api/ISceneHandler";

/**
 * SceneManager existence event
 * @private
 */
export class SceneManagerEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static SCENE_MANAGER_ADD: string = "sceneManagerAdd";

    public static SCENE_MANAGER_REMOVE: string = "sceneManagerRemove";

    public static HANDLER_ADD: string = "handlerAdd";

    public static HANDLER_REMOVE: string = "handlerRemove";

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

    private _handler: ISceneHandler;

    /**
     * The scene handler associated with this event
     */
    public get handler(): ISceneHandler {
        return this._handler;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a scene manager event
     * @param type The event type
     * @param sceneManager The  Phaser.Scenes.SceneManager associated with this event
     * @param handler The scene handler associated with this event
     */
    constructor(type: string, sceneManager?: Phaser.Scenes.SceneManager, handler?: ISceneHandler) {
        super(type, true);
        this._sceneManager = sceneManager;
        this._handler = handler;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): SceneManagerEvent {
        return new SceneManagerEvent(this.type, this._sceneManager, this._handler);
    }
}
