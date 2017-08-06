import { injectable, inject } from "@robotlegsjs/core";

import { StateMediator } from "@robotlegsjs/phaser";

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
