// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ITypeMatcher } from "@robotlegsjs/core";
import { ISceneMediatorMapper } from "../dsl/ISceneMediatorMapper";
import { ISceneMediatorUnmapper } from "../dsl/ISceneMediatorUnmapper";

/**
 * The SceneMediator Map allows you to bind Mediators to Phaser.Scene objects
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
     * Maps a Phaser.Scene that will be tested against incoming items to be handled.
     * Under the hood this will create a TypeMatcher for this scene.
     * @param scene The class or interface to be matched against.
     * @return the mapper so that you can continue the mapping.
     */
    map(scene: IClass<Phaser.Scene>): ISceneMediatorMapper;

    /**
     * Removes a mapping that was made against a matcher.
     * No error will be thrown if there isn't a mapping to remove.
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmapMatcher(matcher: ITypeMatcher): ISceneMediatorUnmapper;

    /**
     * Removes a mapping that was made against a scene.
     * No error will be thrown if there isn't a mapping to remove.
     * @param scene The class or interface to be matched against.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmap(scene: IClass<Phaser.Scene>): ISceneMediatorUnmapper;

    /**
     * Mediates an scene directly. If the scene matches any mapped matchers or types then it will be mediated according to those mappings.
     * @param scene The scene to create mediators for.
     */
    mediate(scene: IClass<Phaser.Scene>): void;

    /**
     * Removes the mediators for an scene if there are any.
     * @param scene The scene to remove mediators for.
     */
    unmediate(scene: IClass<Phaser.Scene>): void;

    /**
     * Removes all mediators
     */
    unmediateAll(): void;
}
