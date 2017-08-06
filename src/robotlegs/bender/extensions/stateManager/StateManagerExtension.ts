// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    IContext,
    IExtension,
    IInjector
} from "robotlegs";

import { IStateManager } from "./api/IStateManager";
import { StateManager } from "./impl/StateManager";

import { StateRegistry } from "./impl/StateRegistry";

/**
 * This extension install a State Manager into the context
 */
export class StateManagerExtension implements IExtension {

    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // Really? Yes, there can be only one.
    private static _containerRegistry: StateRegistry;

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _viewManager: IStateManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.whenInitializing(this.whenInitializing.bind(this));
        context.whenDestroying(this.whenDestroying.bind(this));

        this._injector = context.injector;

        // Just one Container Registry
        StateManagerExtension._containerRegistry = StateManagerExtension._containerRegistry || new StateRegistry();
        this._injector.bind(StateRegistry).toConstantValue(StateManagerExtension._containerRegistry);

        // But you get your own View Manager
        this._injector.bind(IStateManager).to(StateManager).inSingletonScope();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private whenInitializing(): void {
        this._viewManager = this._injector.get<IStateManager>(IStateManager);
    }

    private whenDestroying(): void {
        this._viewManager.removeAllHandlers();
        this._injector.unbind(IStateManager);
        this._injector.unbind(StateRegistry);
    }
}
