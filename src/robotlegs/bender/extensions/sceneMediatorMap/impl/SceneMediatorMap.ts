// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, ILogger, ITypeMatcher, TypeMatcher } from "@robotlegsjs/core";

import { ISceneMediatorMap } from "../api/ISceneMediatorMap";
import { ISceneMediatorMapper } from "../dsl/ISceneMediatorMapper";
import { ISceneMediatorUnmapper } from "../dsl/ISceneMediatorUnmapper";

import { ISceneHandler } from "../../sceneManager/api/ISceneHandler";

import { SceneMediatorFactory } from "./SceneMediatorFactory";
import { SceneMediatorStateHandler } from "./SceneMediatorStateHandler";
import { NullSceneMediatorUnmapper } from "./NullSceneMediatorUnmapper";
import { SceneMediatorMapper } from "./SceneMediatorMapper";

import { injectable, inject } from "inversify";

/**
 * @private
 */
@injectable()
export class SceneMediatorMap implements ISceneMediatorMap, ISceneHandler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappers: Map<string, SceneMediatorMapper> = new Map<string, SceneMediatorMapper>();

    private _logger: ILogger;

    private _factory: SceneMediatorFactory;

    private _sceneHandler: SceneMediatorStateHandler;

    private NULL_UNMAPPER: ISceneMediatorUnmapper = new NullSceneMediatorUnmapper();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(@inject(IContext) context: IContext) {
        this._logger = context.getLogger(this);
        this._factory = new SceneMediatorFactory(context.injector);
        this._sceneHandler = new SceneMediatorStateHandler(this._factory);
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public mapMatcher(matcher: ITypeMatcher): ISceneMediatorMapper {
        const desc = matcher.createTypeFilter().descriptor;
        let mapper: SceneMediatorMapper = this._mappers.get(desc);

        if (mapper) {
            return mapper;
        }

        mapper = this.createMapper(matcher) as SceneMediatorMapper;
        this._mappers.set(desc, mapper);
        return mapper;
    }

    /**
     * @inheritDoc
     */
    public map(type: any): ISceneMediatorMapper {
        return this.mapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public unmapMatcher(matcher: ITypeMatcher): ISceneMediatorUnmapper {
        return this._mappers.get(matcher.createTypeFilter().descriptor) || this.NULL_UNMAPPER;
    }

    /**
     * @inheritDoc
     */
    public unmap(type: any): ISceneMediatorUnmapper {
        return this.unmapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public handleScene(scene: any, type: any): void {
        this._sceneHandler.handleScene(scene, type);
    }

    /**
     * @inheritDoc
     */
    public mediate(item: any): void {
        this._sceneHandler.handleItem(item, <any>item["constructor"]);
    }

    /**
     * @inheritDoc
     */
    public unmediate(item: any): void {
        this._factory.removeMediators(item);
    }

    /**
     * @inheritDoc
     */
    public unmediateAll(): void {
        this._factory.removeAllMediators();
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private createMapper(matcher: ITypeMatcher): ISceneMediatorMapper {
        return new SceneMediatorMapper(matcher.createTypeFilter(), this._sceneHandler, this._logger);
    }
}
