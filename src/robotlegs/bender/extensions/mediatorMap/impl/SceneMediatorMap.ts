// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IContext, ILogger, ITypeMatcher, TypeMatcher, IClass } from "@robotlegsjs/core";

import { ISceneMediatorMap } from "../api/ISceneMediatorMap";
import { IMediatorMapper } from "../dsl/IMediatorMapper";
import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";

import { ISceneHandler } from "../../viewManager/api/ISceneHandler";

import { SceneMediatorFactory } from "./SceneMediatorFactory";
import { MediatorStateHandler } from "./MediatorStateHandler";
import { NullSceneMediatorUnmapper } from "./NullSceneMediatorUnmapper";
import { MediatorMapper } from "./MediatorMapper";

/**
 * @private
 */
@injectable()
export class SceneMediatorMap implements ISceneMediatorMap, ISceneHandler {

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappers: Map<string, MediatorMapper> = new Map<string, MediatorMapper>();

    private _logger: ILogger;

    private _factory: SceneMediatorFactory;

    private _sceneHandler: MediatorStateHandler;

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
        this._sceneHandler = new MediatorStateHandler(this._factory);
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public mapMatcher(matcher: ITypeMatcher): IMediatorMapper {
        const desc = matcher.createTypeFilter().descriptor;
        let mapper: MediatorMapper = this._mappers.get(desc);

        if (mapper) {
            return mapper;
        }

        mapper = this.createMapper(matcher) as MediatorMapper;
        this._mappers.set(desc, mapper);
        return mapper;
    }

    /**
     * @inheritDoc
     */
    public map(scene: IClass<Phaser.Scene>): IMediatorMapper {
        return this.mapMatcher(new TypeMatcher().allOf(scene));
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
    public unmap(scene: IClass<Phaser.Scene>): IMediatorUnmapper {
        return this.unmapMatcher(new TypeMatcher().allOf(scene));
    }

    /**
     * @inheritDoc
     */
    public handleScene(scene: Phaser.Scene, type: any): void {
        this._sceneHandler.handleScene(scene, type);
    }

    /**
     * @inheritDoc
     */
    public mediate(scene: IClass<Phaser.Scene>): void {
        this._sceneHandler.handleItem(scene, <any>scene.constructor);
    }

    /**
     * @inheritDoc
     */
    public unmediate(scene: IClass<Phaser.Scene>): void {
        this._factory.removeMediators(scene);
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
        return new MediatorMapper(matcher.createTypeFilter(), this._sceneHandler, this._logger);
    }
}
