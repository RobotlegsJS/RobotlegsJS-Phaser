// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "@robotlegsjs/core";

import { GameModel } from "../models/GameModel";
import { ViewMediator } from "../../src/robotlegs/bender/extensions/mediatorMap/impl/ViewMediator";
import PlayerView from "../views/PlayerView";

@injectable()
export class PlayerViewMediator extends ViewMediator<PlayerView> {
    @inject(GameModel)
    public gameModel: GameModel;

    public initialize(): void {
        console.log("PlayerViewMediator: initialize");
        console.log("score: " + this.gameModel.score);
        console.log("level: " + this.gameModel.level);
        
        setTimeout( () =>  {
            this.view.destroy();
        } , 1000 )

    }

    public destroy(): void {
        console.log("PlayerViewMediator: destroy");
    }
}
