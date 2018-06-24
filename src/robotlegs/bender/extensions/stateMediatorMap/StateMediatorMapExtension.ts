// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector } from "@robotlegsjs/core";

import { IStateMediatorMap } from "./api/IStateMediatorMap";
import { StateMediatorMap } from "./impl/StateMediatorMap";

import { IStateManager } from "../stateManager/api/IStateManager";

/**
 * This extension installs a shared IStateMediatorMap into the context
 */
export class StateMediatorMapExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _mediatorMap: StateMediatorMap;

    private _viewManager: IStateManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context
            .beforeInitializing(this.beforeInitializing.bind(this))
            .beforeDestroying(this.beforeDestroying.bind(this))
            .whenDestroying(this.whenDestroying.bind(this));
        this._injector = context.injector;
        this._injector
            .bind(IStateMediatorMap)
            .to(StateMediatorMap)
            .inSingletonScope();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private beforeInitializing(): void {
        this._mediatorMap = this._injector.get<StateMediatorMap>(IStateMediatorMap);
        if (this._injector.isBound(IStateManager)) {
            this._viewManager = this._injector.get<IStateManager>(IStateManager);
            this._viewManager.addStateHandler(this._mediatorMap);
        }
    }

    private beforeDestroying(): void {
        this._mediatorMap.unmediateAll();
        if (this._injector.isBound(IStateManager)) {
            this._viewManager = this._injector.get<IStateManager>(IStateManager);
            this._viewManager.removeStateHandler(this._mediatorMap);
        }
    }

    private whenDestroying(): void {
        if (this._injector.isBound(IStateMediatorMap)) {
            this._injector.unbind(IStateMediatorMap);
        }
    }
}
