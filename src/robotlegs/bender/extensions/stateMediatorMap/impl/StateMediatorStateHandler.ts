// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IStateMediatorMapping } from "../api/IStateMediatorMapping";
import { IStateHandler } from "../../stateManager/api/IStateHandler";

import { StateMediatorFactory } from "./StateMediatorFactory";

/**
 * @private
 */
export class StateMediatorStateHandler implements IStateHandler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappings: IStateMediatorMapping[] = [];

    private _knownMappings: Map<
        FunctionConstructor,
        IStateMediatorMapping[]
    > = new Map<FunctionConstructor, IStateMediatorMapping[]>();

    private _factory: StateMediatorFactory;

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
    public addMapping(mapping: IStateMediatorMapping): void {
        let index: number = this._mappings.indexOf(mapping);
        if (index > -1) {
            return;
        }
        this._mappings.push(mapping);
        this.flushCache();
    }

    /**
     * @private
     */
    public removeMapping(mapping: IStateMediatorMapping): void {
        let index: number = this._mappings.indexOf(mapping);
        if (index === -1) {
            return;
        }
        this._mappings.splice(index, 1);
        this.flushCache();
    }

    /**
     * @private
     */
    public handleState(state: any, type: FunctionConstructor): void {
        let interestedMappings = this.getInterestedMappingsFor(state, type);
        if (interestedMappings) {
            this._factory.createMediators(state, type, interestedMappings);
        }
    }

    /**
     * @private
     */
    public handleItem(item: Object, type: FunctionConstructor): void {
        let interestedMappings = this.getInterestedMappingsFor(item, type);
        if (interestedMappings) {
            this._factory.createMediators(item, type, interestedMappings);
        }
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private flushCache(): void {
        this._knownMappings = new Map<
            FunctionConstructor,
            IStateMediatorMapping[]
        >();
    }

    private getInterestedMappingsFor(
        item: Object,
        type: any
    ): IStateMediatorMapping[] {
        // we've seen this type before and nobody was interested
        if (this._knownMappings[type] === false) {
            return null;
        }

        // we haven't seen this type before
        if (this._knownMappings[type] === undefined) {
            this._knownMappings[type] = false;
            for (let i in this._mappings) {
                let mapping: IStateMediatorMapping = this._mappings[i];
                if (mapping.matcher.matches(item)) {
                    if (!this._knownMappings[type]) {
                        this._knownMappings[type] = [];
                    }
                    this._knownMappings[type].push(mapping);
                }
            }
            // nobody cares, let's get out of here
            if (this._knownMappings[type] === false) {
                return null;
            }
        }

        // these mappings really do care
        return this._knownMappings[type];
    }
}
