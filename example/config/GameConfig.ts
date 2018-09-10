// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IConfig, IContext, IEventCommandMap } from "@robotlegsjs/core";

import { MainCommand } from "../commands/MainCommand";
import { AddRobotlegsScoreCommand } from "../commands/AddRobotlegsScoreCommand";
import { MainEvent } from "../events/MainEvent";
import { GameModel } from "../models/GameModel";

@injectable()
export class GameConfig implements IConfig {
    @inject(IContext)
    public context: IContext;

    @inject(IEventCommandMap)
    public commandMap: IEventCommandMap;

    public configure(): void {
        this.mapCommands();
        this.mapManager();
        this.mapModels();
    }

    private mapCommands(): void {
        this.commandMap.map(MainEvent.GAME_START).toCommand(MainCommand);
        this.commandMap.map(MainEvent.ADD_ROBOTLEGS_IMAGE).toCommand(AddRobotlegsScoreCommand);
    }

    private mapManager(): void {}

    private mapModels(): void {
        this.context.injector
            .bind(GameModel)
            .to(GameModel)
            .inSingletonScope();
    }
}
