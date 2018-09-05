// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IContext, ILogger, ITypeMatcher, TypeMatcher } from "@robotlegsjs/core";

import { IViewMediatorMap } from "../api/IViewMediatorMap";
import { IMediatorMapper } from "../dsl/IMediatorMapper";
import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";

import { IViewHandler } from "../../sceneManager/api/IViewHandler";

import { SceneMediatorFactory } from "./SceneMediatorFactory";
import { SceneMediatorStateHandler } from "./SceneMediatorStateHandler";
import { NullSceneMediatorUnmapper } from "./NullSceneMediatorUnmapper";
import { SceneMediatorMapper } from "./SceneMediatorMapper";

/**
 * @private
 */
@injectable()
export class ViewMediatorMap implements IViewMediatorMap, IViewHandler {

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappers: Map<string, SceneMediatorMapper> = new Map<string, SceneMediatorMapper>();

    private _logger: ILogger;

    private _factory: SceneMediatorFactory;

    private _sceneHandler: SceneMediatorStateHandler;

    private NULL_UNMAPPER: IMediatorUnmapper = new NullSceneMediatorUnmapper();

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
    public mapMatcher(matcher: ITypeMatcher): IMediatorMapper {
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
    public map(type: any): IMediatorMapper {
        return this.mapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public unmapMatcher(matcher: ITypeMatcher): IMediatorUnmapper {
        return this._mappers.get(matcher.createTypeFilter().descriptor) || this.NULL_UNMAPPER;
    }

    /**
     * @inheritDoc
     */
    public unmap(type: any): IMediatorUnmapper {
        return this.unmapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public handleView(view: Phaser.GameObjects.Container, type: any): void {
        this._sceneHandler.handleView(view, type);
    }

    /**
     * @inheritDoc
     */
    public mediate(item: any): void {
        this._sceneHandler.handleItem(item, <any>item.constructor);
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

    private createMapper(matcher: ITypeMatcher): IMediatorMapper {
        return new SceneMediatorMapper(matcher.createTypeFilter(), this._sceneHandler, this._logger);
    }
}
