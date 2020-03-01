// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension } from "@robotlegsjs/core";

import { IEventEmitterMap } from "./api/IEventEmitterMap";
import { EventEmitterMap } from "./impl/EventEmitterMap";

/**
 * An Event Map keeps track of listeners and provides the ability
 * to unregister all listeners with a single method call.
 */
export class LocalEventEmitterMapExtension implements IExtension {
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.injector.bind(IEventEmitterMap).to(EventEmitterMap);
    }
}
