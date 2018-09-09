// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IClass, IContext, ILogger, ITypeMatcher, TypeMatcher } from "@robotlegsjs/core";

import { IViewHandler } from "../../viewManager/api/IViewHandler";

import { IViewMediatorMap } from "../api/IViewMediatorMap";
import { IMediatorMapper } from "../dsl/IMediatorMapper";
import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";

import { ViewMediatorFactory } from "./ViewMediatorFactory";
import { MediatorViewHandler } from "./MediatorViewHandler";
import { NullSceneMediatorUnmapper } from "./NullSceneMediatorUnmapper";
import { MediatorMapper } from "./MediatorMapper";

/**
 * @private
 */
@injectable()
export class ViewMediatorMap implements IViewMediatorMap, IViewHandler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappers: Map<string, MediatorMapper> = new Map<string, MediatorMapper>();

    private _logger: ILogger;

    private _factory: ViewMediatorFactory;

    private _viewHandler: MediatorViewHandler;

    private NULL_UNMAPPER: IMediatorUnmapper = new NullSceneMediatorUnmapper();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(@inject(IContext) context: IContext) {
        this._logger = context.getLogger(this);
        this._factory = new ViewMediatorFactory(context.injector);
        this._viewHandler = new MediatorViewHandler(this._factory);
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
    public map(view: IClass<Phaser.GameObjects.Container>): IMediatorMapper {
        return this.mapMatcher(new TypeMatcher().allOf(view));
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
    public unmap(view: IClass<Phaser.GameObjects.Container>): IMediatorUnmapper {
        return this.unmapMatcher(new TypeMatcher().allOf(view));
    }

    /**
     * @inheritDoc
     */
    public handleView(view: Phaser.GameObjects.Container, type: any): void {
        this._viewHandler.handleView(view, type);
    }

    /**
     * @inheritDoc
     */
    public mediate(view: IClass<Phaser.GameObjects.Container>): void {
        this._viewHandler.handleItem(view, <any>view.constructor);
    }

    /**
     * @inheritDoc
     */
    public unmediate(view: IClass<Phaser.GameObjects.Container>): void {
        this._factory.removeMediators(view);
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
        return new MediatorMapper(matcher.createTypeFilter(), this._viewHandler, this._logger);
    }
}
