// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { StateBinding } from "./StateBinding";
import { StateRegistry } from "./StateRegistry";
import { StageRegistryEvent } from "./StateRegistryEvent";

/**
 * @private
 */
export class StateManagerObserver {

    private _registry: StateRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(containerRegistry: StateRegistry) {
        this._registry = containerRegistry;

        // We only care about roots
        this._registry.addEventListener(StageRegistryEvent.ROOT_CONTAINER_ADD, this.onRootContainerAdd, this);
        this._registry.addEventListener(StageRegistryEvent.ROOT_CONTAINER_REMOVE, this.onRootContainerRemove, this);

        // We might have arrived late on the scene
        for (let i in this._registry.rootBindings) {
            let binding: StateBinding = this._registry.rootBindings[i];
            this.addRootListener(binding.container);
        }
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public destroy(): void {
        this._registry.removeEventListener(StageRegistryEvent.ROOT_CONTAINER_ADD, this.onRootContainerAdd, this);
        this._registry.removeEventListener(StageRegistryEvent.ROOT_CONTAINER_REMOVE, this.onRootContainerRemove, this);

        for (let i in this._registry.rootBindings) {
            let binding: StateBinding = this._registry.rootBindings[i];
            this.removeRootListener(binding.container);
        }
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onRootContainerAdd(event: StageRegistryEvent): void {
        this.addRootListener(event.container);
    }

    private onRootContainerRemove(event: StageRegistryEvent): void {
        this.removeRootListener(event.container);
    }

    private addRootListener(container: any): void {
        let stateManager: Phaser.StateManager = <Phaser.StateManager>container;
        if (stateManager) {
            stateManager.onStateChange.add(this.onStateChange, this, -1);
        }
    }

    private onStateChange(currentStateKey: string, previousStateKey: string): void {
        let rootBindings: StateBinding[] = this._registry.rootBindings;
        let stateManager: Phaser.StateManager;

        for (let i: number = 0; i < rootBindings.length; i++) {
            stateManager = <Phaser.StateManager>(rootBindings[i].container);

            if (stateManager && stateManager.states[currentStateKey]) {
                let binding: StateBinding = this._registry.getBinding(stateManager.states[currentStateKey]);
                if (binding) {
                    binding.handleState(stateManager.states[currentStateKey], stateManager.states[currentStateKey]["constructor"]);
                }
            }
        }
    }

    private removeRootListener(container: any): void {
        let stateManager: Phaser.StateManager = <Phaser.StateManager>container;
        if (stateManager) {
            stateManager.onStateChange.remove(this.onStateChange, this);
        }
    }
}
