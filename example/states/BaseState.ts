// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export abstract class BaseState extends Phaser.State {
    public init(): void {
        console.log(this.key + ": init");
    }

    public create(): void {
        console.log(this.key + ": create");
    }

    public shutdown(): void {
        console.log(this.key + ": shutdown");
    }
}
