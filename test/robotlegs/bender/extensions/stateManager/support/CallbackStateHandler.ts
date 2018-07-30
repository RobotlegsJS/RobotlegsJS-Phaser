// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IStateHandler } from "../../../../../../src/robotlegs/bender/extensions/stateManager/api/IStateHandler";

/**
 * @private
 */
export class CallbackStateHandler implements IStateHandler {
    private _callback: Function;

    constructor(callback: Function = null) {
        this._callback = callback;
    }

    public handleState(state: Phaser.State, type: IClass<any>): void {
        if (this._callback) {
            this._callback(state, type);
        }
    }
}
