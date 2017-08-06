import { injectable } from "robotlegs";

import { StateMediator } from "@robotlegsjs/robotlegsjs-phaser";

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
