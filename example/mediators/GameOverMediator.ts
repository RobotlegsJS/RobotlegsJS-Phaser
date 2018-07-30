// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

import { StateMediator } from "../../src/robotlegs/bender/extensions/stateMediatorMap/impl/StateMediator";

import { GameOver } from "../states/GameOver";

@injectable()
export class GameOverMediator extends StateMediator<GameOver> {
    public initialize(): void {
        console.log("GameOverMediator: initialize");
    }

    public destroy(): void {
        console.log("GameOverMediator: destroy");
    }
}
