// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ITypeMatcher } from "@robotlegsjs/core";
import { ISceneMediatorMapper } from "../dsl/ISceneMediatorMapper";
import { ISceneMediatorUnmapper } from "../dsl/ISceneMediatorUnmapper";

/**
 * The StateMediator Map allows you to bind Mediators to Phaser.State objects
 */
export let ISceneMediatorMap = Symbol("ISceneMediatorMap");
export interface ISceneMediatorMap {
    /**
     * Maps a matcher that will be tested against incoming items to be handled.
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the mapper so that you can continue the mapping.
     */
    mapMatcher(matcher: ITypeMatcher): ISceneMediatorMapper;

    /**
     * Maps a Phaser.State that will be tested against incoming items to be handled.
     * Under the hood this will create a TypeMatcher for this state.
     * @param state The class or interface to be matched against.
     * @return the mapper so that you can continue the mapping.
     */
    map(state: IClass<Phaser.Scene>): ISceneMediatorMapper;

    /**
     * Removes a mapping that was made against a matcher.
     * No error will be thrown if there isn't a mapping to remove.
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmapMatcher(matcher: ITypeMatcher): ISceneMediatorUnmapper;

    /**
     * Removes a mapping that was made against a state.
     * No error will be thrown if there isn't a mapping to remove.
     * @param state The class or interface to be matched against.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmap(state: IClass<Phaser.Scene>): ISceneMediatorUnmapper;

    /**
     * Mediates an state directly. If the state matches any mapped matchers or types then it will be mediated according to those mappings.
     * @param state The state to create mediators for.
     */
    mediate(state: IClass<Phaser.Scene>): void;

    /**
     * Removes the mediators for an state if there are any.
     * @param state The state to remove mediators for.
     */
    unmediate(state: IClass<Phaser.Scene>): void;

    /**
     * Removes all mediators
     */
    unmediateAll(): void;
}
