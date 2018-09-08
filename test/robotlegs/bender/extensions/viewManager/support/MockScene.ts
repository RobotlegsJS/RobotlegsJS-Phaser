// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { MockView } from "./MockView";

export class MockScene extends Phaser.Scene {
    public view: MockView;

    constructor(scene: string) {
        super({ key: scene });
    }

    public preload(): void {}

    public create(): void {
        this.view = new MockView(this);

        this.add.existing(this.view);
    }
}
