// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IBundle, IContext } from "@robotlegsjs/core";

import { ContextStateManagerExtension } from "../../extensions/contextStateManager/ContextStateManagerExtension";
import { StateManagerExtension } from "../../extensions/stateManager/StateManagerExtension";
import { StateMediatorMapExtension } from "../../extensions/stateMediatorMap/StateMediatorMapExtension";
import { ContextStateManagerListenerConfig } from "../../extensions/contextStateManager/impl/ContextStateManagerListenerConfig";
import { StateManagerObserverExtension } from "../../extensions/stateManager/StateManagerObserverExtension";

/**
 * For that Classic Robotlegs flavour
 *
 * <p>This bundle installs a number of extensions commonly used
 * in typical Robotlegs applications and modules.</p>
 */
export class PhaserBundle implements IBundle {
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.install(
            ContextStateManagerExtension,
            StateManagerExtension,
            StateManagerObserverExtension,
            StateMediatorMapExtension
        );

        context.configure(ContextStateManagerListenerConfig);
    }
}
