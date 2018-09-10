// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IInjector } from "@robotlegsjs/core";

import { AbstractMediatorFactory } from "./AbstractMediatorFactory";
import { SceneMediatorManager } from "./SceneMediatorManager";

export class SceneMediatorFactory extends AbstractMediatorFactory {
    constructor(injector: IInjector, manager?: SceneMediatorManager) {
        super(injector);
        this._manager = manager || new SceneMediatorManager(this);
    }
}
