// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { SceneKey } from "../constants/SceneKey";

import { BaseScene } from "./BaseScene";
import PlayerView from "../views/PlayerView";

export class Main extends BaseScene {

    private player : PlayerView;
    constructor() {
        super(SceneKey.MAIN);
    }

    public create(): void {
        super.create();
        this.player = new PlayerView(this, 400, 300);
        this.add.existing(this.player);

        this.add.image(100, 150, "koreez");
        this.add.image(680, 130, "robotlegs");
    }
}
