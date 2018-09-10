// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector } from "@robotlegsjs/core";

import { ISceneManager } from "../viewManager/api/ISceneManager";

import { IViewMediatorMap } from "./api/IViewMediatorMap";
import { ViewMediatorMap } from "./impl/ViewMediatorMap";

/**
 * This extension installs a shared IViewMediatorMap into the context
 */
export class ViewMediatorMapExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _mediatorMap: ViewMediatorMap;

    private _sceneManager: ISceneManager;

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
            .bind(IViewMediatorMap)
            .to(ViewMediatorMap)
            .inSingletonScope();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private beforeInitializing(): void {
        this._mediatorMap = this._injector.get<ViewMediatorMap>(IViewMediatorMap);
        if (this._injector.isBound(ISceneManager)) {
            this._sceneManager = this._injector.get<ISceneManager>(ISceneManager);
            this._sceneManager.addViewHandler(this._mediatorMap);
        }
    }

    private beforeDestroying(): void {
        this._mediatorMap.unmediateAll();
        if (this._injector.isBound(ISceneManager)) {
            this._sceneManager = this._injector.get<ISceneManager>(ISceneManager);
            this._sceneManager.removeViewHandler(this._mediatorMap);
        }
    }

    private whenDestroying(): void {
        if (this._injector.isBound(IViewMediatorMap)) {
            this._injector.unbind(IViewMediatorMap);
        }
    }
}
