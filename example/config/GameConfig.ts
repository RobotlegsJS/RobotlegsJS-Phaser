import { injectable, inject, IConfig, IContext } from "robotlegs";

import { GameModel } from "../models/GameModel";

@injectable()
export class GameConfig implements IConfig {

    @inject(IContext)
    public context: IContext;

    public configure(): void {
        this.mapCommands();
        this.mapManager();
        this.mapModels();
    }

    private mapCommands(): void {
    }

    private mapManager(): void {
    }

    private mapModels(): void {
        this.context.injector.bind(GameModel).to(GameModel).inSingletonScope();
    }
}
