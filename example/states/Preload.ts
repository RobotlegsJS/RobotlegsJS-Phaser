import { StateKey } from "../constants/StateKey";
import { BaseState } from "./BaseState";

export class Preload extends BaseState {

    public preload(): void {
        /* Preload required assets */
        // this.game.load.image('myImage', 'assets/my-image.png');
        // this.game.load.audio('myAudio', 'assets/my-audio.wav');
        // this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
    }

    public create(): void {
        super.create();

        // NOTE: Change to GameTitle if required
        this.game.state.start(StateKey.MAIN);
    }
}
