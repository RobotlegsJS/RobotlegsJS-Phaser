// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { SceneKey } from "../constants/SceneKey";

import { BaseScene } from "./BaseScene";
import { ScoreView } from "../views/ScoreView";

export class Main extends BaseScene {
    private scoreView: ScoreView;

    constructor() {
        super(SceneKey.MAIN);
    }

    public create(): void {
        super.create();

        this.scoreView = new ScoreView(this);
        // initializing ScoreViewMediator
        this.add.existing(this.scoreView);

        this.add.image(20, 30, "koreez");
    }

    public addRobotlesgImage(x: number, y: number, textureKey: string): void {
        const image: Phaser.GameObjects.Image = this.add.image(x, y, textureKey);
        image.setAngle(Math.floor(Math.random() * (360 + 1)));
    }
}
