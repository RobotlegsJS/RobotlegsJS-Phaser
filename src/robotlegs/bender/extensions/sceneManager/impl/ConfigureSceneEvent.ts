// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import * as Phaser from "phaser";

import { Event } from "@robotlegsjs/core";

/**
 * Scene Configuration Event
 * @private
 */
export class ConfigureSceneEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static CONFIGURE_SCENE: string = "configureScene";

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _scene: Phaser.Scene;

    /**
     * The scene instance associated with this event
     */
    public get scene(): Phaser.Scene {
        return this._scene;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a scene configuration event
     * @param type The event type
     * @param scene The associated scene instance
     */
    constructor(type: string, scene?: Phaser.Scene) {
        super(type, true);
        this._scene = scene;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): ConfigureSceneEvent {
        return new ConfigureSceneEvent(this.type, this._scene);
    }
}
