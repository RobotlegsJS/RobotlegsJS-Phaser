// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/**
 * @private
 */
export class EventEmitterMapConfig {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _emitter: Phaser.Events.EventEmitter;

    /**
     * @private
     */
    public get emitter(): Phaser.Events.EventEmitter {
        return this._emitter;
    }

    private _event: string | symbol;

    /**
     * @private
     */
    public get event(): string | symbol {
        return this._event;
    }

    private _listener: Function;

    /**
     * @private
     */
    public get listener(): Function {
        return this._listener;
    }

    private _context: any;

    /**
     * @private
     */
    public get context(): any {
        return this._context;
    }

    private _once: boolean;

    /**
     * @private
     */
    public get once(): boolean {
        return this._once;
    }

    private _calback: Function;

    /**
     * @private
     */
    public get calback(): Function {
        return this._calback;
    }

    /**
     * @private
     */
    public set calback(value: Function) {
        this._calback = value;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context: any, once?: boolean) {
        this._emitter = emitter;
        this._event = event;
        this._listener = listener;
        this._context = context;
        this._once = once;
    }

    public equalTo(emitter: Phaser.Events.EventEmitter, event: string | symbol, listener: Function, context: any): boolean {
        return this._emitter === emitter && this._event === event && this._listener === listener && this._context === context;
    }
}
