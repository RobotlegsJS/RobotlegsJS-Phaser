// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";
import { ISceneHandler } from "../../../../../../src/robotlegs/bender/extensions/sceneManager/api/ISceneHandler";

/**
 * @private
 */
export class CallbackStateHandler implements ISceneHandler {
    private _callback: Function;

    constructor(callback: Function = null) {
        this._callback = callback;
    }

    public handleScene(scene: Phaser.Scene, type: IClass<any>): void {
        if (this._callback) {
            this._callback(scene, type);
        }
    }
}
