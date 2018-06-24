export abstract class BaseState extends Phaser.State {
    public init(): void {
        console.log(this.key + ": init");
    }

    public create(): void {
        console.log(this.key + ": create");
    }

    public shutdown(): void {
        console.log(this.key + ": shutdown");
    }
}
