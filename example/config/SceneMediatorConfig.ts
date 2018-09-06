// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig, inject, injectable } from "@robotlegsjs/core";

import { ISceneMediatorMap } from "../../src/robotlegs/bender/extensions/mediatorMap/api/ISceneMediatorMap";

import { BootMediator } from "../mediators/BootMediator";
import { MainMediator } from "../mediators/MainMediator";
import { PreloadMediator } from "../mediators/PreloadMediator";

import { Boot } from "../scenes/Boot";
import { Main } from "../scenes/Main";
import { Preload } from "../scenes/Preload";
import { IViewMediatorMap } from "../../src/robotlegs/bender/extensions/mediatorMap/api/IViewMediatorMap";
import PlayerView from "../views/PlayerView";
import { PlayerViewMediator } from "../mediators/PlayerViewMediator";

@injectable()
export class SceneMediatorConfig implements IConfig {
    @inject(ISceneMediatorMap)
    public sceneMediatorMap: ISceneMediatorMap;

    @inject(IViewMediatorMap)
    public viewMediatorMap: IViewMediatorMap;  

    public configure(): void {
        this.mapMediators();
    }

    private mapMediators(): void {
        // mapping scenes with mediators
        this.sceneMediatorMap.map(Boot).toMediator(BootMediator);
        this.sceneMediatorMap.map(Preload).toMediator(PreloadMediator);
        this.sceneMediatorMap.map(Main).toMediator(MainMediator);

        // mapping views (Container) with mediators
        this.viewMediatorMap.map(PlayerView).toMediator(PlayerViewMediator);
    }
}
