import { BaseState } from "./BaseState";

export class GameOver extends BaseState {

    public create(): void {
        super.create();

        this.restartGame();
    }

    public restartGame(): void {
        // this.game.state.start(StateKey.MAIN);
    }
}
