export abstract class BaseScene extends Phaser.Scene {
    public init(): void {
        console.log(this + ": init");
    }

    public create(): void {
        console.log(this + ": create");
    }

    public shutdown(): void {
        console.log(this + ": shutdown");
    }
}
