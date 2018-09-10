// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IMediatorMapping } from "./IMediatorMapping";

export const IMediatorManager = Symbol("IMediatorManager");
export interface IMediatorManager {
    addMediator(mediator: any, item: any, mapping: IMediatorMapping): void;

    removeMediator(mediator: any, item: any, mapping: IMediatorMapping): void;
}
