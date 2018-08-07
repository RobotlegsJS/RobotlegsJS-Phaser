// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "@robotlegsjs/core";

import { SceneMediator } from "../../src/robotlegs/bender/extensions/sceneMediatorMap/impl/SceneMediator";

import { MainEvent } from "../events/MainEvent";
import { GameModel } from "../models/GameModel";
import { Main } from "../scenes/Main";

@injectable()
export class MainMediator extends SceneMediator<Main> {
    @inject(GameModel)
    public gameModel: GameModel;

    public initialize(): void {
        console.log("MainMediator: initialize");
        console.log("score: " + this.gameModel.score);
        console.log("level: " + this.gameModel.level);
        this.dispatch(new MainEvent(MainEvent.GAME_START, true, false, { data: this.gameModel.level }));
    }

    public destroy(): void {
        console.log("MainMediator: destroy");
    }
}
