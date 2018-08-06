// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import * as Phaser from "phaser";

import { IClass } from "@robotlegsjs/core";

import { ISceneHandler } from "../../sceneManager/api/ISceneHandler";
import { ISceneMediatorMapping } from "../api/ISceneMediatorMapping";
import { SceneMediatorFactory } from "./SceneMediatorFactory";

/**
 * @private
 */
export class SceneMediatorStateHandler implements ISceneHandler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappings: ISceneMediatorMapping[] = [];

    private _knownMappings: Map<IClass<any>, ISceneMediatorMapping[] | boolean> = new Map<IClass<any>, ISceneMediatorMapping[]>();

    private _factory: SceneMediatorFactory;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(factory: SceneMediatorFactory) {
        this._factory = factory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addMapping(mapping: ISceneMediatorMapping): void {
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
    public removeMapping(mapping: ISceneMediatorMapping): void {
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
    public handleScene(scene: Phaser.Scene, type: IClass<any>): void {
        let interestedMappings = this.getInterestedMappingsFor(scene, type);
        if (interestedMappings) {
            this._factory.createMediators(scene, type, interestedMappings);
        }
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
    /* Private Functions                                                          */
    /*============================================================================*/

    private flushCache(): void {
        this._knownMappings = new Map<IClass<any>, ISceneMediatorMapping[]>();
    }

    private getInterestedMappingsFor(item: any, type: any): ISceneMediatorMapping[] {
        // we've seen this type before and nobody was interested
        if (this._knownMappings.get(type) === false) {
            return null;
        }

        // we haven't seen this type before
        if (this._knownMappings.get(type) === undefined) {
            this._knownMappings.set(type, false);

            this._mappings.forEach((mapping: ISceneMediatorMapping) => {
                if (mapping.matcher.matches(item)) {
                    if (!this._knownMappings.get(type)) {
                        this._knownMappings.set(type, []);
                    }
                    (this._knownMappings.get(type) as ISceneMediatorMapping[]).push(mapping);
                }
            });

            // nobody cares, let's get out of here
            if (this._knownMappings.get(type) === false) {
                return null;
            }
        }

        // these mappings really do care
        return this._knownMappings.get(type) as ISceneMediatorMapping[];
    }
}
