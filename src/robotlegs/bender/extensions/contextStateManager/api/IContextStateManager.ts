// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export let IContextStateManager = Symbol("IContextStateManager");
export interface IContextStateManager {
    stateManager: Phaser.StateManager;
}
