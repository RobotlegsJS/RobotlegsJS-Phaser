import { BaseState } from "./BaseState";

export class Main extends BaseState {

    public create(): void {
        super.create();

        // Enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Set the games background colour
        this.game.stage.backgroundColor = '#cecece';
    }

    public update() {
    }
}
