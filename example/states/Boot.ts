import { StateKey } from "../constants/StateKey";
import { BaseState } from "./BaseState";

export class Boot extends BaseState {

    public preload(): void {
    }

    public create(): void {
        super.create();

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.state.start(StateKey.PRELOAD);
    }
}
