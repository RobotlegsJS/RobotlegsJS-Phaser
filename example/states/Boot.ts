// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { StateKey } from "../constants/StateKey";
import { BaseState } from "./BaseState";

export class Boot extends BaseState {
    public preload(): void {}

    public create(): void {
        super.create();

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.state.start(StateKey.PRELOAD);
    }
}
