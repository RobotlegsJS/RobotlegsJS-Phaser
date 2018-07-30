// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { BaseState } from "./BaseState";

export class Main extends BaseState {
    public create(): void {
        super.create();

        // Enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Set the games background colour
        this.game.stage.backgroundColor = "#cecece";
    }

    public update() {}
}
