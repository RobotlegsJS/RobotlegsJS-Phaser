// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import * as Phaser from "phaser";

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
