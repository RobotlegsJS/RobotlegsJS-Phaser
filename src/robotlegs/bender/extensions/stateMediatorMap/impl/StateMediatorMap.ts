// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    IContext,
    ILogger,
    ITypeMatcher,
    TypeMatcher
} from "@robotlegsjs/core";

import { IStateMediatorMap } from "../api/IStateMediatorMap";
import { IStateMediatorMapper } from "../dsl/IStateMediatorMapper";
import { IStateMediatorUnmapper } from "../dsl/IStateMediatorUnmapper";

import { IStateHandler } from "../../stateManager/api/IStateHandler";

import { StateMediatorFactory } from "./StateMediatorFactory";
import { StateMediatorStateHandler } from "./StateMediatorStateHandler";
import { NullStateMediatorUnmapper } from "./NullStateMediatorUnmapper";
import { StateMediatorMapper } from "./StateMediatorMapper";

import { injectable, inject } from "inversify";

/**
 * @private
 */
@injectable()
export class StateMediatorMap implements IStateMediatorMap, IStateHandler {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappers: Map<string, IStateMediatorMapper> = new Map<
        string,
        IStateMediatorMapper
    >();

    private _logger: ILogger;

    private _factory: StateMediatorFactory;

    private _stateHandler: StateMediatorStateHandler;

    private NULL_UNMAPPER: IStateMediatorUnmapper = new NullStateMediatorUnmapper();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(@inject(IContext) context: IContext) {
        this._logger = context.getLogger(this);
        this._factory = new StateMediatorFactory(context.injector);
        this._stateHandler = new StateMediatorStateHandler(this._factory);
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public mapMatcher(matcher: ITypeMatcher): IStateMediatorMapper {
        this._mappers[matcher.createTypeFilter().descriptor] =
            this._mappers[matcher.createTypeFilter().descriptor] ||
            this.createMapper(matcher);
        return this._mappers[matcher.createTypeFilter().descriptor];
    }

    /**
     * @inheritDoc
     */
    public map(type: any): IStateMediatorMapper {
        return this.mapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public unmapMatcher(matcher: ITypeMatcher): IStateMediatorUnmapper {
        return (
            this._mappers[matcher.createTypeFilter().descriptor] ||
            this.NULL_UNMAPPER
        );
    }

    /**
     * @inheritDoc
     */
    public unmap(type: any): IStateMediatorUnmapper {
        return this.unmapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public handleState(state: any, type: any): void {
        this._stateHandler.handleState(state, type);
    }

    /**
     * @inheritDoc
     */
    public mediate(item: any): void {
        this._stateHandler.handleItem(item, <any>item["constructor"]);
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

    private createMapper(matcher: ITypeMatcher): IStateMediatorMapper {
        return new StateMediatorMapper(
            matcher.createTypeFilter(),
            this._stateHandler,
            this._logger
        );
    }
}
