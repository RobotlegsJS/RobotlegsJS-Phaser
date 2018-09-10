// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IInjector } from "@robotlegsjs/core";

import { AbstractMediatorFactory } from "./AbstractMediatorFactory";
import { ViewMediatorManager } from "./ViewMediatorManager";

export class ViewMediatorFactory extends AbstractMediatorFactory {
    constructor(injector: IInjector, manager?: ViewMediatorManager) {
        super(injector);
        this._manager = manager || new ViewMediatorManager(this);
    }
}
