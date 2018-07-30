// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { BaseState } from "./BaseState";

export class GameOver extends BaseState {
    public create(): void {
        super.create();

        this.restartGame();
    }

    public restartGame(): void {
        // this.game.state.start(StateKey.MAIN);
    }
}
