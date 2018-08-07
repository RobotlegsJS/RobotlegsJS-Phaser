// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, Event, ICommand } from "@robotlegsjs/core";

@injectable()
export class MainCommand implements ICommand {
    public execute(event: Event): void {
        console.log(event.type, event.data);
    }
}
