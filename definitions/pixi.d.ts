/// <reference types="@robotlegsjs/core" />

import { IEvent } from "@robotlegsjs/core";

/**
 * Augment PIXI module to recognize IEventDispatcher patch.
 */
declare module "pixi.js" {

    interface IEventDispatcher {
        addEventListener(type: string, listener?: Function): void;
        hasEventListener(type: string, listener?: Function): boolean;
        removeEventListener(type: string, listener?: Function): void;
        willTrigger(type: string): boolean;
        dispatchEvent(event: IEvent): boolean;
    }

    export interface DisplayObject extends IEventDispatcher { }
    export interface SystemRenderer extends IEventDispatcher { }

    export interface BaseTexture extends IEventDispatcher { }
    export interface Texture extends IEventDispatcher { }

    export namespace loaders {
        export interface Loader extends IEventDispatcher { }
        export interface Resource extends IEventDispatcher { }
    }

}
