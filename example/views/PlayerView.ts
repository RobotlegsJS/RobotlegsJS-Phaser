class PlayerView extends Phaser.GameObjects.Container {
    
    public playerImage: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]){
        super(scene, x, y, children);
        this.playerImage = this.scene.add.image( 0, 0, 'player');
        this.add(this.playerImage);
    }
}

export default PlayerView;