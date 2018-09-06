// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "@robotlegsjs/core";

@injectable()
export class GameModel {

    public robotlegsScore: number;

    constructor() {
        this.clear();
    }

    public clear(): void {
        this.robotlegsScore = 0;
    }
}
