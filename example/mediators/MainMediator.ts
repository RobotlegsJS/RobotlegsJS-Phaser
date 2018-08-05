import { injectable, inject } from "@robotlegsjs/core";

import { GameModel } from "../models/GameModel";
import { Main } from "../scenes/Main";
import { SceneMediator } from "../../src";
import { MainEvent } from "../events/MainEven";

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
