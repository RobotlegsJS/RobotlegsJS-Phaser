// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, IContext, ILogger, ITypeMatcher, TypeMatcher } from "@robotlegsjs/core";

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

    private _mappers: Map<string, StateMediatorMapper> = new Map<string, StateMediatorMapper>();

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
        const desc = matcher.createTypeFilter().descriptor;
        let mapper = this._mappers.get(desc);

        if (mapper) {
            return mapper;
        }

        mapper = this.createMapper(matcher);
        this._mappers.set(desc, mapper);
        return mapper;
    }

    /**
     * @inheritDoc
     */
    public map(type: IClass<Phaser.State>): IStateMediatorMapper {
        return this.mapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public unmapMatcher(matcher: ITypeMatcher): IStateMediatorUnmapper {
        return this._mappers.get(matcher.createTypeFilter().descriptor) || this.NULL_UNMAPPER;
    }

    /**
     * @inheritDoc
     */
    public unmap(type: IClass<Phaser.State>): IStateMediatorUnmapper {
        return this.unmapMatcher(new TypeMatcher().allOf(type));
    }

    /**
     * @inheritDoc
     */
    public handleState(state: Phaser.State, type: IClass<any>): void {
        this._stateHandler.handleState(state, type);
    }

    /**
     * @inheritDoc
     */
    public mediate(item: IClass<Phaser.State>): void {
        this._stateHandler.handleItem(item, <IClass<any>>item.constructor);
    }

    /**
     * @inheritDoc
     */
    public unmediate(item: IClass<Phaser.State>): void {
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

    private createMapper(matcher: ITypeMatcher): StateMediatorMapper {
        return new StateMediatorMapper(matcher.createTypeFilter(), this._stateHandler, this._logger);
    }
}
