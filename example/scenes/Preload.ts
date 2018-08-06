// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { SceneKey } from "../constants/SceneKey";
import { BaseScene } from "./BaseScene";
import { Main } from "./Main";

export class Preload extends BaseScene {
    public preload(): void {
        /* Preload required assets */
        this.load.image("player", "assets/player.png");
        // this.game.load.audio('myAudio', 'assets/my-audio.wav');
        // this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
    }

    public create(): void {
        super.create();

        // NOTE: Change to GameTitle if required
        // this.game.state.start(StateKey.MAIN);

        (this as any).scene.add(SceneKey.MAIN, new Main(SceneKey.MAIN));
        (<any>window).game.scene.remove(this);
        (<any>window).game.scene.start(SceneKey.MAIN);
    }
}
