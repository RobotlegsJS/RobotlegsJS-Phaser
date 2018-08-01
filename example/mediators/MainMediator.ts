// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "@robotlegsjs/core";

import { StateMediator } from "../../src/robotlegs/bender/extensions/stateMediatorMap/impl/StateMediator";

import { GameModel } from "../models/GameModel";
import { Main } from "../states/Main";

@injectable()
export class MainMediator extends StateMediator<Main> {
    @inject(GameModel)
    public gameModel: GameModel;

    public initialize(): void {
        console.log("BootMediator: initialize");
        console.log("score: " + this.gameModel.score);
        console.log("level: " + this.gameModel.level);
    }

    public destroy(): void {
        console.log("MainMediator: destroy");
    }
}
