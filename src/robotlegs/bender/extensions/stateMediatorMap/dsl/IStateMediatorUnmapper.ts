// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

/**
 * Unmaps a StateMediator
 */
export interface IStateMediatorUnmapper {
    /**
     * Unmaps a mediator from this matcher
     * @param mediatorClass StateMediator to unmap
     */
    fromMediator(mediatorClass: IClass<any>): void;

    /**
     * Unmaps all mediator mappings for this matcher
     */
    fromAll(): void;
}
