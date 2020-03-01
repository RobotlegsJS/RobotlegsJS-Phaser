// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IBundle, IContext, ILogger, instanceOfType } from "@robotlegsjs/core";

import { IContextSceneManager } from "../../extensions/contextSceneManager/api/IContextSceneManager";
import { ContextSceneManager } from "../../extensions/contextSceneManager/impl/ContextSceneManager";
import { ContextSceneManagerListenerConfig } from "../../extensions/contextSceneManager/impl/ContextSceneManagerListenerConfig";
import { ContextSceneManagerExtension } from "../../extensions/contextSceneManager/ContextSceneManagerExtension";

import { SceneMediatorMapExtension } from "../../extensions/mediatorMap/SceneMediatorMapExtension";
import { ViewMediatorMapExtension } from "../../extensions/mediatorMap/ViewMediatorMapExtension";

import { SceneManagerExtension } from "../../extensions/viewManager/SceneManagerExtension";
import { SceneManagerObserverExtension } from "../../extensions/viewManager/SceneManagerObserverExtension";
import { LocalEventEmitterMapExtension } from "../../extensions/localEventEmitterMap/LocalEventEmitterMapExtension";

/**
 * For that Classic Robotlegs flavour
 *
 * <p>This bundle installs a number of extensions commonly used
 * in typical Robotlegs applications and modules.</p>
 */
export class PhaserBundle implements IBundle {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _context: IContext;
    private _logger: ILogger;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        this._context = context;
        this._logger = context.getLogger(this);

        this._context.install(
            ContextSceneManagerExtension,
            LocalEventEmitterMapExtension,
            SceneManagerExtension,
            SceneManagerObserverExtension,
            SceneMediatorMapExtension,
            ViewMediatorMapExtension
        );

        this._context.addConfigHandler(instanceOfType(ContextSceneManager), this.handleContextSceneManager.bind(this));
        this._context.whenInitializing(this.whenInitializing.bind(this));
        this._context.afterDestroying(this.afterDestroying.bind(this));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private handleContextSceneManager(contextSceneManager: ContextSceneManager): void {
        this._context.configure(ContextSceneManagerListenerConfig);
    }

    private whenInitializing(): void {
        if (!this._context.injector.isBound(IContextSceneManager)) {
            this._logger.error("PhaserBundle requires IContextSceneManager.");
        }
    }

    private afterDestroying(): void {
        this._context = null;
        this._logger = null;
    }
}
