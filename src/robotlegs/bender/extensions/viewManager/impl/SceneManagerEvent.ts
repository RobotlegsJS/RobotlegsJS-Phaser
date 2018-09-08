// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

import { ISceneHandler } from "../api/ISceneHandler";
import { IViewHandler } from "../api/IViewHandler";

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

    public static SCENE_HANDLER_ADD: string = "sceneHandlerAdd";

    public static SCENE_HANDLER_REMOVE: string = "sceneHandlerRemove";

    public static VIEW_HANDLER_ADD: string = "viewHandlerAdd";

    public static VIEW_HANDLER_REMOVE: string = "viewHandlerRemove";

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

    private _sceneHandler: ISceneHandler;

    /**
     * The scene handler associated with this event
     */
    public get sceneHandler(): ISceneHandler {
        return this._sceneHandler;
    }

    private _viewHandler: IViewHandler;

    /**
     * The view handler associated with this event
     */
    public get viewHandler(): IViewHandler {
        return this._viewHandler;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a scene manager event
     * @param type The event type
     * @param sceneManager The  Phaser.Scenes.SceneManager associated with this event
     * @param sceneHandler The scene handler associated with this event
     * @param viewHandler The view handler associated with this event
     */
    constructor(type: string, sceneManager?: Phaser.Scenes.SceneManager, sceneHandler?: ISceneHandler, viewHandler?: IViewHandler) {
        super(type, true);
        this._sceneManager = sceneManager;
        this._sceneHandler = sceneHandler;
        this._viewHandler = viewHandler;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): SceneManagerEvent {
        return new SceneManagerEvent(this.type, this._sceneManager, this._sceneHandler, this._viewHandler);
    }
}
