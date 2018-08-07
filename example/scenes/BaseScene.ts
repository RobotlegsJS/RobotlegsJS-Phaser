// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export abstract class BaseScene extends Phaser.Scene {
    constructor(scene: string) {
        super({ key: scene });
    }

    public init(): void {
        console.log(this + ": init");
    }

    public create(): void {
        console.log(this + ": create");
    }

    public shutdown(): void {
        console.log(this + ": shutdown");
    }
}
