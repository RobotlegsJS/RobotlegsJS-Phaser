// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { AbstractMediator } from "./AbstractMediator";

/**
 * Classic Robotlegs mediator implementation for the <code>Phaser.GameObjects.Container</code>.
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class ViewMediator<T extends Phaser.GameObjects.Container> extends AbstractMediator {
    protected _viewComponent: T;

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    public set view(view: T) {
        this._viewComponent = view;
    }

    public get view(): T {
        return this._viewComponent;
    }
}
