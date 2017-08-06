// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

import { IStateHandler } from "../api/IStateHandler";

/**
 * Container existence event
 * @private
 */
export class StateManagerEvent extends Event {

    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static CONTAINER_ADD: string = 'containerAdd';

    public static CONTAINER_REMOVE: string = 'containerRemove';

    public static HANDLER_ADD: string = 'handlerAdd';

    public static HANDLER_REMOVE: string = 'handlerRemove';

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _container: any;

    /**
     * The container associated with this event
     */
    public get container(): any {
        return this._container;
    }

    private _handler: IStateHandler;

    /**
     * The state handler associated with this event
     */
    public get handler(): IStateHandler {
        return this._handler;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a state manager event
     * @param type The event type
     * @param container The container associated with this event
     * @param handler The state handler associated with this event
     */
    constructor(type: string, container?: any, handler?: IStateHandler) {
        super(type);
        this._container = container;
        this._handler = handler;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): StateManagerEvent {
        return new StateManagerEvent(this.type, this._container, this._handler);
    }
}
