// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IStateMediatorUnmapper } from "../dsl/IStateMediatorUnmapper";

/**
 * @private
 */
export class NullStateMediatorUnmapper implements IStateMediatorUnmapper {
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public fromMediator(mediatorClass: IClass<any>): void {}

    /**
     * @private
     */
    public fromAll(): void {}
}
