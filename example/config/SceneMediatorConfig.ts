// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IConfig, inject, injectable } from "@robotlegsjs/core";

import { ISceneMediatorMap } from "../../src/robotlegs/bender/extensions/sceneMediatorMap/api/ISceneMediatorMap";

import { BootMediator } from "../mediators/BootMediator";
import { MainMediator } from "../mediators/MainMediator";
import { PreloadMediator } from "../mediators/PreloadMediator";

import { Boot } from "../scenes/Boot";
import { Main } from "../scenes/Main";
import { Preload } from "../scenes/Preload";

@injectable()
export class SceneMediatorConfig implements IConfig {
    @inject(ISceneMediatorMap)
    public sceneMediatorMap: ISceneMediatorMap;

    public configure(): void {
        this.mapSceneMediators();
    }

    private mapSceneMediators(): void {
        this.sceneMediatorMap.map(Boot).toMediator(BootMediator);
        this.sceneMediatorMap.map(Preload).toMediator(PreloadMediator);
        this.sceneMediatorMap.map(Main).toMediator(MainMediator);
    }
}
