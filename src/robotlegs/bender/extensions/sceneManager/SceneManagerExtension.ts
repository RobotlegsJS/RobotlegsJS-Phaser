// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector } from "@robotlegsjs/core";
import { ISceneManager } from "./api/ISceneManager";
import { SceneManager } from "./impl/SceneManager";
import { SceneRegistry } from "./impl/SceneRegistry";

/**
 * This extension install a Scene Manager into the context
 */
export class SceneManagerExtension implements IExtension {
    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // Really? Yes, there can be only one.
    private static _containerRegistry: SceneRegistry;

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _viewManager: ISceneManager;

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
        SceneManagerExtension._containerRegistry = SceneManagerExtension._containerRegistry || new SceneRegistry();
        this._injector.bind(SceneRegistry).toConstantValue(SceneManagerExtension._containerRegistry);

        // But you get your own View Manager
        this._injector
            .bind(ISceneManager)
            .to(SceneManager)
            .inSingletonScope();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private whenInitializing(): void {
        this._viewManager = this._injector.get<ISceneManager>(ISceneManager);
    }

    private whenDestroying(): void {
        this._viewManager.removeAllHandlers();
        this._injector.unbind(ISceneManager);
        this._injector.unbind(SceneRegistry);
    }
}
