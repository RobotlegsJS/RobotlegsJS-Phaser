// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector, ILogger, instanceOfType } from "@robotlegsjs/core";
import { IContextSceneManager } from "./api/IContextSceneManager";
import { ContextSceneManager } from "./impl/ContextSceneManager";

/**
 * <p>This Extension waits for a ContextSceneManager to be added as a configuration
 * and maps it into the context's injector.</p>
 *
 * <p>It should be installed before context initialization.</p>
 */
export class ContextSceneManagerExtension implements IExtension {
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
        this._injector = context.injector;
        this._logger = context.getLogger(this);
        context.beforeInitializing(this.beforeInitializing.bind(this));
        context.addConfigHandler(instanceOfType(ContextSceneManager), this.handleContextSceneManager.bind(this));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private handleContextSceneManager(contextSceneManager: IContextSceneManager): void {
        if (this._injector.isBound(IContextSceneManager)) {
            this._logger.warn("A contextSceneManager has already been installed, ignoring {0}", [contextSceneManager.sceneManager]);
        } else {
            this._logger.debug("Mapping {0} as contextSceneManager", [contextSceneManager.sceneManager]);

            this._injector.bind(IContextSceneManager).toConstantValue(contextSceneManager);
        }
    }

    private beforeInitializing(): void {
        if (!this._injector.isBound(IContextSceneManager)) {
            this._logger.error("A ContextSceneManager must be installed if you install the ContextSceneManagerExtension.");
        }
    }
}
