// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ITypeMatcher } from "@robotlegsjs/core";

import { IMediatorMapper } from "../dsl/IMediatorMapper";
import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";

/**
 * The IViewMediatorMap Map allows you to bind Mediators to Phaser.GameObjects.Container objects
 */
export const IViewMediatorMap = Symbol("IViewMediatorMap");
export interface IViewMediatorMap {
    /**
     * Maps a matcher that will be tested against incoming items to be handled.
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the mapper so that you can continue the mapping.
     */
    mapMatcher(matcher: ITypeMatcher): IMediatorMapper;

    /**
     * Maps a Phaser.GameObjects.Container that will be tested against incoming items to be handled.
     * Under the hood this will create a TypeMatcher for this view container.
     * @param view The class or interface to be matched against.
     * @return the mapper so that you can continue the mapping.
     */
    map(view: IClass<Phaser.GameObjects.Container>): IMediatorMapper;

    /**
     * Removes a mapping that was made against a matcher.
     * No error will be thrown if there isn't a mapping to remove.
     * @param matcher The type or package matcher specifying the rules for matching.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmapMatcher(matcher: ITypeMatcher): IMediatorUnmapper;

    /**
     * Removes a mapping that was made against a view.
     * No error will be thrown if there isn't a mapping to remove.
     * @param view The class or interface to be matched against.
     * @return the unmapper so that you can continue the unmapping.
     */
    unmap(view: IClass<Phaser.GameObjects.Container>): IMediatorUnmapper;

    /**
     * Mediates an view directly. If the view matches any mapped matchers or types then it will be mediated according to those mappings.
     * @param view The view to create mediators for.
     */
    mediate(view: IClass<Phaser.GameObjects.Container>): void;

    /**
     * Removes the mediators for an scene if there are any.
     * @param view The view to remove mediators for.
     */
    unmediate(view: IClass<Phaser.GameObjects.Container>): void;

    /**
     * Removes all mediators
     */
    unmediateAll(): void;
}
