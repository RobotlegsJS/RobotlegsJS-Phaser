import { IConfig, inject, injectable } from "@robotlegsjs/core";
import { ISceneMediatorMap } from "../../src/robotlegs/bender/extensions/sceneMediatorMap/api/ISceneMediatorMap";
import { PreloadMediator } from "../mediators/PreloadMediator";
import { BootMediator } from "../mediators/BootMediator";
import { Preload } from "../scenes/Preload";
import { Boot } from "../scenes/Boot";
import { Main } from "../scenes/Main";
import { MainMediator } from "../mediators/MainMediator";

@injectable()
export class SceneMediatorConfig implements IConfig {
    @inject(ISceneMediatorMap) public sceneMediatorMap: ISceneMediatorMap;

    public configure(): void {
        this.mapStateMediators();
    }

    private mapStateMediators(): void {
        this.sceneMediatorMap.map(Boot).toMediator(BootMediator);
        this.sceneMediatorMap.map(Preload).toMediator(PreloadMediator);
        // this.sceneMediatorMap.map(GameTitle).toMediator(GameTitleMediator);
        this.sceneMediatorMap.map(Main).toMediator(MainMediator);
        // this.sceneMediatorMap.map(GameOver).toMediator(GameOverMediator);
    }
}