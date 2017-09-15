// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

import { EventDispatcher } from "@robotlegsjs/core";

import { IStateHandler } from "../api/IStateHandler";
import { IStateManager } from "../api/IStateManager";

import { StateManagerEvent } from "./StateManagerEvent";

import { StateRegistry } from "./StateRegistry";
import { StateBinding } from "./StateBinding";

/**
 * @private
 */
@injectable()
export class StateManager extends EventDispatcher implements IStateManager {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _containers: any[] = [];

    /**
     * @inheritDoc
     */
    public get containers(): any[] {
        return this._containers;
    }

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _handlers: IStateHandler[] = [];

    private _registry: StateRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(containerRegistry: StateRegistry) {
        super();
        this._registry = containerRegistry;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public addContainer(container: any): void {
        if (!this.validContainer(container)) {
            return;
        }

        this._containers.push(container);

        for (let i in this._handlers) {
            let handler: IStateHandler = this._handlers[i];
            this._registry.addContainer(container).addHandler(handler);
        }
        this.dispatchEvent(
            new StateManagerEvent(StateManagerEvent.CONTAINER_ADD, container)
        );
    }

    /**
     * @inheritDoc
     */
    public removeContainer(container: any): void {
        var index: number = this._containers.indexOf(container);
        if (index === -1) {
            return;
        }

        this._containers.splice(index, 1);

        var binding: StateBinding = this._registry.getBinding(container);
        for (let i in this._handlers) {
            let handler: IStateHandler = this._handlers[i];
            binding.removeHandler(handler);
        }
        this.dispatchEvent(
            new StateManagerEvent(StateManagerEvent.CONTAINER_REMOVE, container)
        );
    }

    /**
     * @inheritDoc
     */
    public addStateHandler(handler: IStateHandler): void {
        if (this._handlers.indexOf(handler) !== -1) {
            return;
        }

        this._handlers.push(handler);

        for (let i in this._containers) {
            let container: any = this._containers[i];
            this._registry.addContainer(container).addHandler(handler);
        }
        this.dispatchEvent(
            new StateManagerEvent(StateManagerEvent.HANDLER_ADD, null, handler)
        );
    }

    /**
     * @inheritDoc
     */
    public removeStateHandler(handler: IStateHandler): void {
        var index: number = this._handlers.indexOf(handler);
        if (index === -1) {
            return;
        }

        this._handlers.splice(index, 1);

        for (let i in this._containers) {
            let container: any = this._containers[i];
            this._registry.getBinding(container).removeHandler(handler);
        }
        this.dispatchEvent(
            new StateManagerEvent(
                StateManagerEvent.HANDLER_REMOVE,
                null,
                handler
            )
        );
    }

    /**
     * @inheritDoc
     */
    public removeAllHandlers(): void {
        for (let i in this._containers) {
            let container: any = this._containers[i];
            var binding: StateBinding = this._registry.getBinding(container);
            for (let j in this._handlers) {
                let handler: IStateHandler = this._handlers[j];
                binding.removeHandler(handler);
            }
        }
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private validContainer(container: any): boolean {
        for (let i in this._containers) {
            let registeredContainer: any = this._containers[i];
            if (container === registeredContainer) {
                return false;
            }

            if (
                registeredContainer.contains(container) ||
                container.contains(registeredContainer)
            ) {
                throw new Error("Containers can not be nested");
            }
        }
        return true;
    }
}
