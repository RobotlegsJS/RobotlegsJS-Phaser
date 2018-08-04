// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

export let IContextSceneManager = Symbol("IContextSceneManager");
export interface IContextSceneManager {
    sceneManager: Phaser.Scenes.SceneManager;
}
