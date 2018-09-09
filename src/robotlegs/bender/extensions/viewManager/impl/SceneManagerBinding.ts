// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, EventDispatcher } from "@robotlegsjs/core";

import { ISceneHandler } from "../api/ISceneHandler";
import { IViewHandler } from "../api/IViewHandler";

import { SceneManagerBindingEvent } from "./SceneManagerBindingEvent";

/**
 * @private
 */
export class SceneManagerBinding extends EventDispatcher {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _parent: SceneManagerBinding;

    /**
     * @private
     */
    public get parent(): SceneManagerBinding {
        return this._parent;
    }

    /**
     * @private
     */
    public set parent(value: SceneManagerBinding) {
        this._parent = value;
    }

    private _sceneManager: Phaser.Scenes.SceneManager;

    /**
     * @private
     */
    public get sceneManager(): Phaser.Scenes.SceneManager {
        return this._sceneManager;
    }

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _sceneHandlers: ISceneHandler[] = [];
    private _viewHandlers: IViewHandler[] = [];

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(sceneManager: Phaser.Scenes.SceneManager) {
        super();
        this._sceneManager = sceneManager;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addSceneHandler(handler: ISceneHandler): void {
        if (this._sceneHandlers.indexOf(handler) > -1) {
            return;
        }
        this._sceneHandlers.push(handler);
    }

    /**
     * @private
     */
    public removeSceneHandler(handler: ISceneHandler): void {
        let index: number = this._sceneHandlers.indexOf(handler);
        if (index > -1) {
            this._sceneHandlers.splice(index, 1);

            this.dispatchBindingEmpty();
        }
    }

    /**
     * @private
     */
    public addViewHandler(handler: IViewHandler): void {
        if (this._viewHandlers.indexOf(handler) > -1) {
            return;
        }
        this._viewHandlers.push(handler);
    }

    /**
     * @private
     */
    public removeViewHandler(handler: IViewHandler): void {
        let index: number = this._viewHandlers.indexOf(handler);
        if (index > -1) {
            this._viewHandlers.splice(index, 1);

            this.dispatchBindingEmpty();
        }
    }

    /**
     * @private
     */
    public handleScene(scene: Phaser.Scene, type: IClass<any>): void {
        this._sceneHandlers.forEach((handler: ISceneHandler) => {
            handler.handleScene(scene, type);
        });
    }

    /**
     * @private
     */
    public handleView(view: Phaser.GameObjects.Container, type: IClass<any>): void {
        this._viewHandlers.forEach((handler: IViewHandler) => {
            handler.handleView(view, type);
        });
    }

    /*============================================================================*/
    /* Private Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    private dispatchBindingEmpty(): void {
        if (this._sceneHandlers.length === 0 && this._viewHandlers.length === 0) {
            this.dispatchEvent(new SceneManagerBindingEvent(SceneManagerBindingEvent.BINDING_EMPTY));
        }
    }
}
