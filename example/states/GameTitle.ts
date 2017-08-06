import { StateKey } from "../constants/StateKey";
import { BaseState } from "./BaseState";

export class GameTitle extends BaseState {

    public create(): void {
        super.create();
    }

    public startGame(): void {
        this.game.state.start(StateKey.MAIN);
    }
}
