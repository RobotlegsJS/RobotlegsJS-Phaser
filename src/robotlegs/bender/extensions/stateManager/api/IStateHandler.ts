// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * State handler contract
 */
export interface IStateHandler {
    /**
     * View handler method
     * @param state The state instance to handle
     * @param type The class of the state instance
     */
    handleState(state: any, type: FunctionConstructor): void;
}
