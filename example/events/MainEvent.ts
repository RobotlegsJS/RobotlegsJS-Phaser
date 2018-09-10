// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

export class MainEvent extends Event {
    public static readonly GAME_START: string = "game_start";
    public static readonly ADD_ROBOTLEGS_IMAGE: string = "add_robotlegs_image";
    public static readonly ADDED_ROBOTLEGS_IMAGE: string = "added_robotlegs_image";
}
