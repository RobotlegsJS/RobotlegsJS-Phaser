// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { EventDispatcher } from "robotlegs";

import { StateBinding } from "./StateBinding";
import { StateBindingEvent } from "./StateBindingEvent";
import { StageRegistryEvent } from "./StateRegistryEvent";

/**
 * @private
 */
export class StateRegistry extends EventDispatcher {

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _rootBindings: StateBinding[] = [];
    private _bindings: StateBinding[] = [];
    private _bindingByContainer: Map<any, StateBinding> = new Map<any, StateBinding>();

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    /**
     * @private
     */
    public get rootBindings(): StateBinding[] {
        return this._rootBindings;
    }

    /**
     * @private
     */
    public get bindings(): StateBinding[] {
        return this._bindings;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addContainer(container: any): StateBinding {
        return this._bindingByContainer[container] = this._bindingByContainer[container] || this.createBinding(container);
    }

    /**
     * @private
     */
    public removeContainer(container: any): StateBinding {
        let binding: StateBinding = this._bindingByContainer[container];
        if (binding) {
            this.removeBinding(binding);
        }
        return binding;
    }

    /**
     * Finds the closest parent binding for a given display object
     *
     * @private
     */
    public findParentBinding(target: any): StateBinding {
        let state: Phaser.State = <Phaser.State>target;
        let binding: StateBinding;
        if (state) {
            binding = this._bindingByContainer[<any>state.game.state];
            if (binding) {
                return binding;
            }
        }
        return null;
    }

    /**
     * @private
     */
    public getBinding(container: any): StateBinding {
        return this._bindingByContainer[container];
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private createBinding(container: any): StateBinding {
        let binding: StateBinding = new StateBinding(container);
        this._bindings.push(binding);

        // Add a listener so that we can remove this binding when it has no handlers
        binding.addEventListener(StateBindingEvent.BINDING_EMPTY, this.onBindingEmpty);

        // If the new binding doesn't have a parent it is a Root
        binding.parent = this.findParentBinding(container);
        if (binding.parent == null) {
            this.addRootBinding(binding);
        }

        // Reparent any bindings which are contained within the new binding AND
        // A. Don't have a parent, OR
        // B. Have a parent that is not contained within the new binding
        for (let i in this._bindingByContainer) {
            let childBinding: StateBinding = this._bindingByContainer[i];
            if (container.contains(childBinding.container)) {
                if (!childBinding.parent) {
                    this.removeRootBinding(childBinding);
                    childBinding.parent = binding;
                }
                else if (!container.contains(childBinding.parent.container)) {
                    childBinding.parent = binding;
                }
            }
        }

        this.dispatchEvent(new StageRegistryEvent(StageRegistryEvent.CONTAINER_ADD, binding.container));
        return binding;
    }

    private removeBinding(binding: StateBinding): void {
        // Remove the binding itself
        delete this._bindingByContainer[binding.container];
        var index: number = this._bindings.indexOf(binding);
        this._bindings.splice(index, 1);

        // Drop the empty binding listener
        binding.removeEventListener(StateBindingEvent.BINDING_EMPTY, this.onBindingEmpty);

        if (!binding.parent) {
            // This binding didn't have a parent, so it was a Root
            this.removeRootBinding(binding);
        }

        // Re-parent the bindings
        for (let i in this._bindingByContainer) {
            let childBinding: StateBinding = this._bindingByContainer[i];
            if (childBinding.parent == binding) {
                childBinding.parent = binding.parent;
                if (!childBinding.parent) {
                    // This binding used to have a parent,
                    // but no longer does, so it is now a Root
                    this.addRootBinding(childBinding);
                }
            }
        }

        this.dispatchEvent(new StageRegistryEvent(StageRegistryEvent.CONTAINER_REMOVE, binding.container));
    }

    private addRootBinding(binding: StateBinding): void {
        this._rootBindings.push(binding);
        this.dispatchEvent(new StageRegistryEvent(StageRegistryEvent.ROOT_CONTAINER_ADD, binding.container));
    }

    private removeRootBinding(binding: StateBinding): void {
        var index: number = this._rootBindings.indexOf(binding);
        this._rootBindings.splice(index, 1);
        this.dispatchEvent(new StageRegistryEvent(StageRegistryEvent.ROOT_CONTAINER_REMOVE, binding.container));
    }

    private onBindingEmpty(event: StateBindingEvent): void {
        this.removeBinding(<any>event.target);
    }
}
