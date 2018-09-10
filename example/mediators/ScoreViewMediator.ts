// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "@robotlegsjs/core";

import { GameModel } from "../models/GameModel";
import { ViewMediator } from "../../src/robotlegs/bender/extensions/mediatorMap/impl/ViewMediator";
import { ScoreView } from "../views/ScoreView";
import { MainEvent } from "../events/MainEvent";

@injectable()
export class ScoreViewMediator extends ViewMediator<ScoreView> {
    @inject(GameModel)
    public gameModel: GameModel;

    public initialize(): void {
        console.log("PlayerViewMediator: initialize");
        console.log("score: " + this.gameModel.robotlegsScore);
        this.view.setText(0);
        this.addContextListener(MainEvent.ADDED_ROBOTLEGS_IMAGE, this.onRobotlegsImageAdded, this);
    }

    public destroy(): void {
        console.log("PlayerViewMediator: destroy");
    }

    private onRobotlegsImageAdded(): void {
        this.view.setText(this.gameModel.robotlegsScore);
    }
}
