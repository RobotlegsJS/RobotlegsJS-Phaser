// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { StateKey } from "../constants/StateKey";
import { BaseState } from "./BaseState";

export class GameTitle extends BaseState {
    public create(): void {
        super.create();
    }

    public startGame(): void {
        this.game.state.start(StateKey.MAIN);
    }
}
