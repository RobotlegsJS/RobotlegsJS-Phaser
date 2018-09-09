// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export class MockGame extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.CANVAS,
            width: 600,
            height: 600,
            backgroundColor: "#010101"
        });
    }
}
