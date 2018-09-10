// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IMediatorMapping } from "../api/IMediatorMapping";
import { SceneMediatorFactory } from "./SceneMediatorFactory";
import { IMediatorManager } from "../api/IMediatorManager";

/**
 * @private
 */
export class SceneMediatorManager implements IMediatorManager {
    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // private static UIComponentClass: FunctionConstructor;

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _factory: SceneMediatorFactory;
    private _autoRemoveMap: Map<string, Phaser.Scene> = new Map<string, Phaser.Scene>();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(factory: SceneMediatorFactory) {
        this._factory = factory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addMediator(mediator: any, item: any, mapping: IMediatorMapping): void {
        let scene: Phaser.Scene = <Phaser.Scene>item;

        // Watch scene for removal
        if (scene && mapping.autoRemoveEnabled) {
            if (!this._autoRemoveMap.has(scene.sys.settings.key)) {
                this._autoRemoveMap.set(scene.sys.settings.key, scene);
            }
            scene.sys.events.on("destroy", this.onSceneDestroy, this);
            // scene.sys.events.on("shutdown", this.onSceneDestroy, this);
            // scene.sys.events.on("sleep", this.onSceneDestroy, this);
            // scene.sys.events.on("pause", this.onSceneDestroy, this);
        }

        // Synchronize with item life-cycle
        this.initializeMediator(mediator, item);
    }

    /**
     * @private
     */
    public removeMediator(mediator: any, item: any, mapping: IMediatorMapping): void {
        this.destroyMediator(mediator);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onSceneDestroy(sys: Phaser.Scenes.Systems): void {
        if (this._autoRemoveMap.has(sys.settings.key)) {
            let scene: Phaser.Scene = this._autoRemoveMap.get(sys.settings.key);
            this._autoRemoveMap.delete(sys.settings.key);
            this._factory.removeMediators(scene);
            if (this._autoRemoveMap.size === 0) {
                scene.sys.events.off("destroy", this.onSceneDestroy, this, false);
            }
        }
    }

    private initializeMediator(mediator: any, mediatedItem: any): void {
        if ("preInitialize" in mediator) {
            mediator.preInitialize();
        }

        if ("scene" in mediator) {
            mediator.scene = mediatedItem;
        }

        if ("initialize" in mediator) {
            mediator.initialize();
        }

        if ("postInitialize" in mediator) {
            mediator.postInitialize();
        }
    }

    private destroyMediator(mediator: any): void {
        if ("preDestroy" in mediator) {
            mediator.preDestroy();
        }

        if ("destroy" in mediator) {
            mediator.destroy();
        }

        if ("scene" in mediator) {
            mediator.scene = null;
        }

        if ("postDestroy" in mediator) {
            mediator.postDestroy();
        }
    }
}
