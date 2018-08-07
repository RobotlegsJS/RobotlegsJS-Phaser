// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IEventMap, IEventDispatcher, Event } from "@robotlegsjs/core";

import { ISceneMediator } from "../api/ISceneMediator";

/**
 * Classic Robotlegs mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class SceneMediator<T extends Phaser.Scene> implements ISceneMediator {
    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    @inject(IEventMap)
    protected eventMap: IEventMap;

    @inject(IEventDispatcher)
    protected eventDispatcher: IEventDispatcher;

    protected _sceneComponent: T;

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    public set scene(scene: T) {
        this._sceneComponent = scene;
    }

    public get scene(): T {
        return this._sceneComponent;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public abstract initialize(): void;

    /**
     * @inheritDoc
     */
    public abstract destroy(): void;

    /**
     * Runs after the mediator has been destroyed.
     * Cleans up listeners mapped through the local EventMap.
     */
    public postDestroy(): void {
        this.eventMap.unmapListeners();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected addViewListener(eventString: string, listener: Function, eventClass?: Object): void {
        // this.eventMap.mapListener(this._sceneComponent, eventString, listener, eventClass);
    }

    protected addContextListener(eventString: string, listener: Function, eventClass?: Object): void {
        // this.eventMap.mapListener(this.eventDispatcher, eventString, listener, eventClass);
    }

    protected removeViewListener(eventString: string, listener: Function, eventClass?: Object): void {
        // this.eventMap.unmapListener(this._sceneComponent, eventString, listener, eventClass);
    }

    protected removeContextListener(eventString: string, listener: Function, eventClass?: Object): void {
        // this.eventMap.unmapListener(this.eventDispatcher, eventString, listener, eventClass);
    }

    protected dispatch(event: Event): void {
        if (this.eventDispatcher.hasEventListener(event.type)) {
            this.eventDispatcher.dispatchEvent(event);
        }
    }
}
