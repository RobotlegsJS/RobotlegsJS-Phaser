// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, EventDispatcher } from "@robotlegsjs/core";

import { ISceneHandler } from "../api/ISceneHandler";
import { ISceneManager } from "../api/ISceneManager";

import { SceneManagerEvent } from "./SceneManagerEvent";

import { SceneRegistry } from "./SceneRegistry";
import { SceneManagerBinding } from "./SceneManagerBinding";
import { IViewHandler } from "../api/IViewHandler";

/**
 * @private
 */
@injectable()
export class SceneManager extends EventDispatcher implements ISceneManager {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _sceneManagers: Phaser.Scenes.SceneManager[] = [];

    /**
     * @inheritDoc
     */
    public get sceneManagers(): Phaser.Scenes.SceneManager[] {
        return this._sceneManagers;
    }

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _sceneHandlers: ISceneHandler[] = [];
    private _viewHandlers: IViewHandler[] = [];

    private _registry: SceneRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(sceneRegistry: SceneRegistry) {
        super();
        this._registry = sceneRegistry;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public addSceneManager(sceneManager: Phaser.Scenes.SceneManager): void {
        if (!this.validSceneManager(sceneManager)) {
            return;
        }

        this._sceneManagers.push(sceneManager);

        this._sceneHandlers.forEach((handler: ISceneHandler) => {
            this._registry.addSceneManager(sceneManager).addSceneHandler(handler);
        });

        this._viewHandlers.forEach((handler: IViewHandler) => {
            this._registry.addSceneManager(sceneManager).addViewHandler(handler);
        });

        this.dispatchEvent(new SceneManagerEvent(SceneManagerEvent.SCENE_MANAGER_ADD, sceneManager));
    }

    /**
     * @inheritDoc
     */
    public removeSceneManager(sceneManager: Phaser.Scenes.SceneManager): void {
        let index: number = this._sceneManagers.indexOf(sceneManager);

        if (index === -1) {
            return;
        }

        this._sceneManagers.splice(index, 1);

        let binding: SceneManagerBinding = this._registry.getBinding(sceneManager);

        this._sceneHandlers.forEach((handler: ISceneHandler) => {
            binding.removeSceneHandler(handler);
        });

        this._viewHandlers.forEach((handler: IViewHandler) => {
            binding.removeViewHandler(handler);
        });

        this.dispatchEvent(new SceneManagerEvent(SceneManagerEvent.SCENE_MANAGER_REMOVE, sceneManager));
    }

    /**
     * @inheritDoc
     */
    public addSceneHandler(handler: ISceneHandler): void {
        if (this._sceneHandlers.indexOf(handler) !== -1) {
            return;
        }

        this._sceneHandlers.push(handler);

        this._sceneManagers.forEach((sceneManager: Phaser.Scenes.SceneManager) => {
            this._registry.addSceneManager(sceneManager).addSceneHandler(handler);
        });

        this.dispatchEvent(new SceneManagerEvent(SceneManagerEvent.SCENE_HANDLER_ADD, null, handler));
    }

    /**
     * @inheritDoc
     */
    public removeSceneHandler(handler: ISceneHandler): void {
        let index: number = this._sceneHandlers.indexOf(handler);
        if (index === -1) {
            return;
        }

        this._sceneHandlers.splice(index, 1);

        this._sceneManagers.forEach((sceneManager: Phaser.Scenes.SceneManager) => {
            this._registry.getBinding(sceneManager).removeSceneHandler(handler);
        });

        this.dispatchEvent(new SceneManagerEvent(SceneManagerEvent.SCENE_HANDLER_REMOVE, null, handler));
    }

    /**
     * @inheritDoc
     */
    public addViewHandler(handler: IViewHandler): void {
        if (this._viewHandlers.indexOf(handler) !== -1) {
            return;
        }

        this._viewHandlers.push(handler);

        this._sceneManagers.forEach((sceneManager: Phaser.Scenes.SceneManager) => {
            this._registry.addSceneManager(sceneManager).addViewHandler(handler);
        });

        this.dispatchEvent(new SceneManagerEvent(SceneManagerEvent.VIEW_HANDLER_ADD, null, null, handler));
    }


    /**
     * @inheritDoc
     */
    public removeViewHandler(handler: IViewHandler): void {
        let index: number = this._viewHandlers.indexOf(handler);
        if (index === -1) {
            return;
        }

        this._sceneHandlers.splice(index, 1);

        this._sceneManagers.forEach((sceneManager: Phaser.Scenes.SceneManager) => {
            this._registry.getBinding(sceneManager).removeViewHandler(handler);
        });

        this.dispatchEvent(new SceneManagerEvent(SceneManagerEvent.SCENE_HANDLER_REMOVE, null, null, handler));
    }

    /**
     * @inheritDoc
     */
    public removeAllHandlers(): void {
        this._sceneManagers.forEach((sceneManager: Phaser.Scenes.SceneManager) => {
            let binding: SceneManagerBinding = this._registry.getBinding(sceneManager);

            this._sceneHandlers.forEach((handler: ISceneHandler) => {
                binding.removeSceneHandler(handler);
            });

            this._viewHandlers.forEach((handler: IViewHandler) => {
                binding.removeViewHandler(handler);
            });
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private validSceneManager(sceneManager: Phaser.Scenes.SceneManager): boolean {
        let valid: boolean = true;

        this._sceneManagers.forEach((registeredSceneManager: Phaser.Scenes.SceneManager) => {
            if (sceneManager === registeredSceneManager) {
                valid = false;
            }
        });

        return valid;
    }
}
