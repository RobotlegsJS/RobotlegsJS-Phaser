// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IStateMediatorMapping } from "../api/IStateMediatorMapping";
import { StateMediatorFactory } from "./StateMediatorFactory";

/**
 * @private
 */
export class StateMediatorManager {

    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // private static UIComponentClass: FunctionConstructor;

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _factory: StateMediatorFactory;
    private _autoRemoveMap: Map<string, Phaser.State> = new Map<string, Phaser.State>();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(factory: StateMediatorFactory) {
        this._factory = factory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addMediator(mediator: any, item: any, mapping: IStateMediatorMapping): void {
        let state: Phaser.State = <Phaser.State>item;

        // Watch state for removal
        if (state && mapping.autoRemoveEnabled) {
            if (!this._autoRemoveMap.has(state.key)) {
                this._autoRemoveMap.set(state.key, state);
            }
            if (!state.game.state.onStateChange.has(this.onStateChange, this)) {
                state.game.state.onStateChange.add(this.onStateChange, this);
            }
        }

        // Synchronize with item life-cycle
        this.initializeMediator(mediator, item);
    }

    /**
     * @private
     */
    public removeMediator(mediator: any, item: any, mapping: IStateMediatorMapping): void {
        this.destroyMediator(mediator);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onStateChange(currentStateKey: string, previousStateKey: string): void {
        if (this._autoRemoveMap.has(previousStateKey)) {
            let state: Phaser.State = this._autoRemoveMap.get(previousStateKey);
            this._autoRemoveMap.delete(previousStateKey);
            this._factory.removeMediators(state);
            if (this._autoRemoveMap.size === 0) {
                state.game.state.onStateChange.remove(this.onStateChange, this);
            }
        }
    }

    private initializeMediator(mediator: any, mediatedItem: any): void {
        if ("preInitialize" in mediator) {
            mediator.preInitialize();
        }

        if ("state" in mediator) {
            mediator.state = mediatedItem;
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

        if ("state" in mediator) {
            mediator.state = null;
        }

        if ("postDestroy" in mediator) {
            mediator.postDestroy();
        }
    }
}
