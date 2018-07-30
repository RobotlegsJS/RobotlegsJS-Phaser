// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { instanceOfType, IContext, IExtension, IInjector, ILogger } from "@robotlegsjs/core";

import { IContextStateManager } from "./api/IContextStateManager";
import { ContextStateManager } from "./impl/ContextStateManager";

/**
 * <p>This Extension waits for a ContextStateManager to be added as a configuration
 * and maps it into the context's injector.</p>
 *
 * <p>It should be installed before context initialization.</p>
 */
export class ContextStateManagerExtension implements IExtension {
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
        context.addConfigHandler(instanceOfType(ContextStateManager), this.handleContextStateManager.bind(this));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private handleContextStateManager(contextStateManager: IContextStateManager): void {
        if (this._injector.isBound(IContextStateManager)) {
            this._logger.warn("A contextStateManager has already been installed, ignoring {0}", [contextStateManager.stateManager]);
        } else {
            this._logger.debug("Mapping {0} as contextStateManager", [contextStateManager.stateManager]);

            this._injector.bind(IContextStateManager).toConstantValue(contextStateManager);
        }
    }

    private beforeInitializing(): void {
        if (!this._injector.isBound(IContextStateManager)) {
            this._logger.error("A ContextStateManager must be installed if you install the ContextStateManagerExtension.");
        }
    }
}
