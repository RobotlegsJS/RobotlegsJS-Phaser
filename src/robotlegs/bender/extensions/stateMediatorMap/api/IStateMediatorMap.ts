// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ITypeMatcher } from "@robotlegsjs/core";

import { IStateMediatorMapper } from "../dsl/IStateMediatorMapper";
import { IStateMediatorUnmapper } from "../dsl/IStateMediatorUnmapper";

/**
 * The StateMediator Map allows you to bind Mediators to Phaser.State objects
 */
export let IStateMediatorMap = Symbol("IStateMediatorMap");
export interface IStateMediatorMap {
    /**
     * Maps a matcher that will be tested against incoming items to be handled.
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the mapper so that you can continue the mapping.
     */
    mapMatcher(matcher: ITypeMatcher): IStateMediatorMapper;

    /**
     * Maps a Phaser.State that will be tested against incoming items to be handled.
     * Under the hood this will create a TypeMatcher for this state.
     * @param state The class or interface to be matched against.
     * @return the mapper so that you can continue the mapping.
     */
    map(state: IClass<Phaser.State>): IStateMediatorMapper;

    /**
     * Removes a mapping that was made against a matcher.
     * No error will be thrown if there isn't a mapping to remove.
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmapMatcher(matcher: ITypeMatcher): IStateMediatorUnmapper;

    /**
     * Removes a mapping that was made against a state.
     * No error will be thrown if there isn't a mapping to remove.
     * @param state The class or interface to be matched against.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmap(state: IClass<Phaser.State>): IStateMediatorUnmapper;

    /**
     * Mediates an state directly. If the state matches any mapped matchers or types then it will be mediated according to those mappings.
     * @param state The state to create mediators for.
     */
    mediate(state: IClass<Phaser.State>): void;

    /**
     * Removes the mediators for an state if there are any.
     * @param state The state to remove mediators for.
     */
    unmediate(state: IClass<Phaser.State>): void;

    /**
     * Removes all mediators
     */
    unmediateAll(): void;
}
