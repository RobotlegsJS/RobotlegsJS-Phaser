// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IMediatorMapping } from "../api/IMediatorMapping";

import { AbstractMediatorFactory } from "./AbstractMediatorFactory";

/**
 * @private
 */
export abstract class AbstractMediatorHandler {
    /*============================================================================*/
    /* Protected Properties                                                         */
    /*============================================================================*/

    protected _mappings: IMediatorMapping[] = [];

    protected _knownMappings: Map<IClass<any>, IMediatorMapping[] | boolean> = new Map<IClass<any>, IMediatorMapping[]>();

    protected _factory: AbstractMediatorFactory;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(factory: AbstractMediatorFactory) {
        this._factory = factory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addMapping(mapping: IMediatorMapping): void {
        let index: number = this._mappings.indexOf(mapping);
        if (index > -1) {
            return;
        }
        this._mappings.push(mapping);
        this._knownMappings.clear();
    }

    /**
     * @private
     */
    public removeMapping(mapping: IMediatorMapping): void {
        let index: number = this._mappings.indexOf(mapping);
        if (index === -1) {
            return;
        }
        this._mappings.splice(index, 1);
        this._knownMappings.clear();
    }

    /**
     * @private
     */
    public handleItem(item: any, type: IClass<any>): void {
        let interestedMappings = this.getInterestedMappingsFor(item, type);
        if (interestedMappings) {
            this._factory.createMediators(item, type, interestedMappings);
        }
    }

    /*============================================================================*/
    /* Protected Functions                                                          */
    /*============================================================================*/

    protected getInterestedMappingsFor(item: any, type: IClass<any>): IMediatorMapping[] {
        // we've seen this type before and nobody was interested
        if (this._knownMappings.get(type) === false) {
            return null;
        }

        // we haven't seen this type before
        if (this._knownMappings.get(type) === undefined) {
            this._knownMappings.set(type, false);

            this._mappings.forEach((mapping: IMediatorMapping) => {
                if (mapping.matcher.matches(item)) {
                    if (!this._knownMappings.get(type)) {
                        this._knownMappings.set(type, []);
                    }
                    (this._knownMappings.get(type) as IMediatorMapping[]).push(mapping);
                }
            });
            // nobody cares, let's get out of here
            if (this._knownMappings.get(type) === false) {
                return null;
            }
        }

        // these mappings really do care
        return this._knownMappings.get(type) as IMediatorMapping[];
    }
}
