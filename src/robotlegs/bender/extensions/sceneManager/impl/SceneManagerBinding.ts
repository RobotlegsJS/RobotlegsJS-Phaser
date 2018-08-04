// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, EventDispatcher } from "@robotlegsjs/core";

import { ISceneHandler } from "../api/ISceneHandler";

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

    private _handlers: ISceneHandler[] = [];

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
    public addHandler(handler: ISceneHandler): void {
        if (this._handlers.indexOf(handler) > -1) {
            return;
        }
        this._handlers.push(handler);
    }

    /**
     * @private
     */
    public removeHandler(handler: ISceneHandler): void {
        let index: number = this._handlers.indexOf(handler);
        if (index > -1) {
            this._handlers.splice(index, 1);
            if (this._handlers.length === 0) {
                this.dispatchEvent(new SceneManagerBindingEvent(SceneManagerBindingEvent.BINDING_EMPTY));
            }
        }
    }

    /**
     * @private
     */
    public handleScene(scene: Phaser.Scene, type: IClass<any>): void {
        this._handlers.forEach((handler: ISceneHandler) => {
            handler.handleScene(scene, type);
        });
    }
}
