import { injectable } from "robotlegs";

import { StateMediator } from "@robotlegsjs/phaser";

import { GameTitle } from "../states/GameTitle";

@injectable()
export class GameTitleMediator extends StateMediator<GameTitle> {

    public initialize(): void {
        console.log("GameTitleMediator: initialize");
    }

    public destroy(): void {
        console.log("GameTitleMediator: destroy");
    }
}
