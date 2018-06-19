import { injectable } from "@robotlegsjs/core";

import { StateMediator } from "../../src/robotlegs/bender/extensions/stateMediatorMap/impl/StateMediator";

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
