// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { SceneKey } from "../constants/SceneKey";

import { BaseScene } from "./BaseScene";

export class Boot extends BaseScene {
    constructor() {
        super(SceneKey.BOOT);
    }

    public preload(): void {}

    public create(): void {
        super.create();

        this.scene.start(SceneKey.PRELOAD);
    }
}
