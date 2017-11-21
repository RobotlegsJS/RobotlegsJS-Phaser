// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEventDispatcher } from "@robotlegsjs/core";
import { IStateHandler } from "./IStateHandler";

/**
 * The State Manager allows you to add multiple "state managers" to a context
 */
export let IStateManager = Symbol("IStateManager");
export interface IStateManager extends IEventDispatcher {
    /**
     * A list of currently registered StateManagers
     */
    stateManagers: Phaser.StateManager[];

    /**
     * Adds a StateManager as a "state root" into the context
     * @param stateManager
     */
    addStateManager(stateManager: Phaser.StateManager): void;

    /**
     * Removes a StateManager from this context
     * @param stateManager
     */
    removeStateManager(stateManager: Phaser.StateManager): void;

    /**
     * Registers a state handler
     * @param handler
     */
    addStateHandler(handler: IStateHandler): void;

    /**
     * Removes a state handler
     * @param handler
     */
    removeStateHandler(handler: IStateHandler): void;

    /**
     * Removes all state handlers from this context
     */
    removeAllHandlers(): void;
}
