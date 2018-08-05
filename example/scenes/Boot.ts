import { SceneKey } from "../constants/SceneKey";
import { BaseScene } from "./BaseScene";
import { Preload } from "./Preload";

export class Boot extends BaseScene {
    public preload(): void {}

    public create(): void {
        super.create();
        (this as any).scene.add(SceneKey.PRELOAD, new Preload(SceneKey.PRELOAD));
        (<any>window).game.scene.remove(this);
        (<any>window).game.scene.start(SceneKey.PRELOAD);
    }
}
