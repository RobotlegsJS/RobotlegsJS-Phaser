// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { ISceneHandler } from "../../viewManager/api/ISceneHandler";

import { AbstractMediatorHandler } from "./AbstractMediatorHandler";

/**
 * @private
 */
export class SceneMediatorHandler extends AbstractMediatorHandler implements ISceneHandler {
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public handleScene(scene: Phaser.Scene, type: IClass<any>): void {
        let interestedMappings = this.getInterestedMappingsFor(scene, type);
        if (interestedMappings) {
            this._factory.createMediators(scene, type, interestedMappings);
        }
    }
}
