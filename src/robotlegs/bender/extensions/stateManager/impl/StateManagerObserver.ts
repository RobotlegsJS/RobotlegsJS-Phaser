// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { StateManagerBinding } from "./StateManagerBinding";
import { StateRegistry } from "./StateRegistry";
import { StateRegistryEvent } from "./StateRegistryEvent";

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
        this._registry.addEventListener(StateRegistryEvent.ROOT_STATE_MANAGER_ADD, this.onRootStateManagerAdd, this);
        this._registry.addEventListener(StateRegistryEvent.ROOT_STATE_MANAGER_REMOVE, this.onRootStateManagerRemove, this);

        // We might have arrived late on the scene
        this._registry.rootBindings.forEach((binding: StateManagerBinding) => {
            this.addRootListener(binding.stateManager);
        });
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public destroy(): void {
        this._registry.removeEventListener(StateRegistryEvent.ROOT_STATE_MANAGER_ADD, this.onRootStateManagerAdd, this);
        this._registry.removeEventListener(StateRegistryEvent.ROOT_STATE_MANAGER_REMOVE, this.onRootStateManagerRemove, this);

        this._registry.rootBindings.forEach((binding: StateManagerBinding) => {
            this.removeRootListener(binding.stateManager);
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onRootStateManagerAdd(event: StateRegistryEvent): void {
        this.addRootListener(event.stateManager);
    }

    private onRootStateManagerRemove(event: StateRegistryEvent): void {
        this.removeRootListener(event.stateManager);
    }

    private addRootListener(stateManager: Phaser.StateManager): void {
        if (stateManager) {
            stateManager.onStateChange.add(this.onStateChange, this, -1);
        }
    }

    private onStateChange(currentStateKey: string, previousStateKey: string): void {
        let rootBindings: StateManagerBinding[] = this._registry.rootBindings;
        let stateManager: Phaser.StateManager;

        rootBindings.forEach((rootBinding: StateManagerBinding) => {
            stateManager = rootBinding.stateManager;

            if (stateManager && stateManager.states[currentStateKey]) {
                let binding: StateManagerBinding = this._registry.getBinding(stateManager.states[currentStateKey]);
                if (binding) {
                    binding.handleState(stateManager.states[currentStateKey], stateManager.states[currentStateKey].constructor);
                }
            }
        });
    }

    private removeRootListener(stateManager: Phaser.StateManager): void {
        if (stateManager) {
            stateManager.onStateChange.remove(this.onStateChange, this);
        }
    }
}
