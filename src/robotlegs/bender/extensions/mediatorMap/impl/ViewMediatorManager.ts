// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IMediatorMapping } from "../api/IMediatorMapping";
import { ViewMediatorFactory } from "./ViewMediatorFactory";
import { IMediatorManager } from "../api/IMediatorManager";

/**
 * @private
 */
export class ViewMediatorManager implements IMediatorManager {
    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // private static UIComponentClass: FunctionConstructor;

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _factory: ViewMediatorFactory;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(factory: ViewMediatorFactory) {
        this._factory = factory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addMediator(mediator: any, item: any, mapping: IMediatorMapping): void {
        let view: Phaser.GameObjects.Container = <Phaser.GameObjects.Container>item;

        // Watch view for destroy
        if (view && mapping.autoRemoveEnabled) {
            view.on("destroy", this.onViewDestroy, this);
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

    private onViewDestroy(view: Phaser.GameObjects.Container): void {
        this._factory.removeMediators(view);
    }

    private initializeMediator(mediator: any, mediatedItem: any): void {
        if ("preInitialize" in mediator) {
            mediator.preInitialize();
        }

        if ("view" in mediator) {
            mediator.view = mediatedItem;
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
