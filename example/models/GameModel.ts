import { injectable } from "robotlegs";

@injectable()
export class GameModel {

    public score: number;
    public level: number;

    constructor() {
        this.clear();
    }

    public clear(): void {
        this.score = 0;
        this.level = 1;
    }
}
