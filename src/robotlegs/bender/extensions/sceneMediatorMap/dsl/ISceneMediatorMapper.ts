// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { ISceneMediatorConfigurator } from "./ISceneMediatorConfigurator";

/**
 * Maps a matcher to a concrete SceneMediator class
 */
export interface ISceneMediatorMapper {
    /**
     * Maps a matcher to a concrete SceneMediator class
     * @param mediatorClass The concrete mediator class
     * @return Mapping configurator
     */
    toMediator(mediatorClass: IClass<any>): ISceneMediatorConfigurator;
}
