// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector, ILogger } from "@robotlegsjs/core";

import { StateRegistry } from "./impl/StateRegistry";
import { StateManagerObserver } from "./impl/StateManagerObserver";

let installCount: number = 0;

/**
 * This extension install an automatic State Manager Observer
 */
export class StateManagerObserverExtension implements IExtension {
    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // Really? Yes, there can be only one.
    private static _stageObserver: StateManagerObserver = null;

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
        if (!StateManagerObserverExtension._stageObserver) {
            var containerRegistry: StateRegistry = this._injector.get<StateRegistry>(StateRegistry);
            this._logger.debug("Creating genuine StateManagerObserver Singleton");
            StateManagerObserverExtension._stageObserver = new StateManagerObserver(containerRegistry);
        }
    }

    private whenDestroying(): void {
        installCount--;
        if (installCount == 0) {
            this._logger.debug("Destroying genuine StateManagerObserver Singleton");
            StateManagerObserverExtension._stageObserver.destroy();
            StateManagerObserverExtension._stageObserver = null;
        }
    }
}
