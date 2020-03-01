// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { AbstractMediator } from "./AbstractMediator";

/**
 * Classic Robotlegs mediator implementation for the `Phaser.Scene`.
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class SceneMediator<T extends Phaser.Scene> extends AbstractMediator {
    protected _sceneComponent: T;

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    public set scene(scene: T) {
        this._sceneComponent = scene;
    }

    public get scene(): T {
        return this._sceneComponent;
    }
}
