// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IViewHandler } from "../../viewManager/api/IViewHandler";

import { AbstractMediatorHandler } from "./AbstractMediatorHandler";

/**
 * @private
 */
export class MediatorViewHandler extends AbstractMediatorHandler implements IViewHandler {
    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public handleView(view: Phaser.GameObjects.Container, type: IClass<any>): void {
        let interestedMappings = this.getInterestedMappingsFor(view, type);
        if (interestedMappings) {
            this._factory.createMediators(view, type, interestedMappings);
        }
    }
}
