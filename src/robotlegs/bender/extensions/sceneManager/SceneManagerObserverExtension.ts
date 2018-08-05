// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector, ILogger } from "@robotlegsjs/core";
import { SceneManagerObserver } from "./impl/SceneManagerObserver";
import { SceneRegistry } from "./impl/SceneRegistry";

let installCount: number = 0;

/**
 * This extension install an automatic Scene Manager Observer
 */
export class SceneManagerObserverExtension implements IExtension {
    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // Really? Yes, there can be only one.
    private static _sceneObserver: SceneManagerObserver = null;

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _logger: ILogger;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.whenInitializing(this.whenInitializing.bind(this));
        context.whenDestroying(this.whenDestroying.bind(this));
        installCount++;
        this._injector = context.injector;
        this._logger = context.getLogger(this);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private whenInitializing(): void {
        // Hark, an actual Singleton!
        if (!SceneManagerObserverExtension._sceneObserver) {
            const containerRegistry: SceneRegistry = this._injector.get<SceneRegistry>(SceneRegistry);
            this._logger.debug("Creating genuine SceneManagerObserver Singleton");
            SceneManagerObserverExtension._sceneObserver = new SceneManagerObserver(containerRegistry);
        }
    }

    private whenDestroying(): void {
        installCount--;
        if (installCount === 0) {
            this._logger.debug("Destroying genuine SceneManagerObserver Singleton");
            SceneManagerObserverExtension._sceneObserver.destroy();
            SceneManagerObserverExtension._sceneObserver = null;
        }
    }
}
