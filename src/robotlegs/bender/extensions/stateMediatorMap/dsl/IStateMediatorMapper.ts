// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IStateMediatorConfigurator } from "./IStateMediatorConfigurator";

/**
 * Maps a matcher to a concrete StateMediator class
 */
export interface IStateMediatorMapper {
    /**
     * Maps a matcher to a concrete StateMediator class
     * @param mediatorClass The concrete mediator class
     * @return Mapping configurator
     */
    toMediator(mediatorClass: any): IStateMediatorConfigurator;
}
