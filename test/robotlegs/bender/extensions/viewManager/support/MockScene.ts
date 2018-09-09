// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { MockView } from "./MockView";

export class MockScene extends Phaser.Scene {
    public sceneId: string;

    public view: MockView;

    constructor(sceneId: string) {
        super({ key: sceneId });

        this.sceneId = sceneId;
    }

    public create(): void {
        this.view = new MockView(this);
        this.add.existing(this.view);

        this.game.events.emit(this.sceneId + "Created");
    }
}
