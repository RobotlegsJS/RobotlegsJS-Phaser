// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

/**
 * Scene handler contract
 */
export interface ISceneHandler {
    /**
     * View handler method
     * @param scene The scene instance to handle
     * @param type The class of the scene instance
     */
    handleScene(scene: Phaser.Scene, type: IClass<any>): void;
}
