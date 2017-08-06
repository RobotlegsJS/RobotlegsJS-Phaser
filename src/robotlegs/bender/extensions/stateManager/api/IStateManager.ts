// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IEventDispatcher } from "robotlegs";
import { IStateHandler } from "./IStateHandler";

/**
 * The State Manager allows you to add multiple "state root" containers to a context
 */
export let IStateManager = Symbol("IStateManager");
export interface IStateManager extends IEventDispatcher {

    /**
     * A list of currently registered container
     */
    containers: any[];

    /**
     * Adds a container as a "state root" into the context
     * @param container
     */
    addContainer(container: any): void;

    /**
     * Removes a container from this context
     * @param container
     */
    removeContainer(container: any): void;

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
