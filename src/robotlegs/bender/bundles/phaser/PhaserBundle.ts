// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IBundle, IContext } from "@robotlegsjs/core";

import { ContextSceneManagerExtension } from "../../extensions/contextSceneManager/ContextSceneManagerExtension";
import { SceneManagerExtension } from "../../extensions/sceneManager/SceneManagerExtension";
import { SceneMediatorMapExtension } from "../../extensions/sceneMediatorMap/SceneMediatorMapExtension";
import { ContextSceneManagerListenerConfig } from "../../extensions/contextSceneManager/impl/ContextSceneManagerListenerConfig";
import { SceneManagerObserverExtension } from "../../extensions/sceneManager/SceneManagerObserverExtension";

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
        context.install(ContextSceneManagerExtension, SceneManagerExtension, SceneManagerObserverExtension, SceneMediatorMapExtension);

        context.configure(ContextSceneManagerListenerConfig);
    }
}
