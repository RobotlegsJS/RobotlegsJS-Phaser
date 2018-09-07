// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";
import { ISceneHandler } from "../../../../../../src";

/**
 * @private
 */
export class CallbackSceneHandler implements ISceneHandler {
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
