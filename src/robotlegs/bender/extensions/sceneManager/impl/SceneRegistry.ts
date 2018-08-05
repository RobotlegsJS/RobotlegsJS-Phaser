// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { EventDispatcher } from "@robotlegsjs/core";

import { SceneManagerBinding } from "./SceneManagerBinding";
import { SceneManagerBindingEvent } from "./SceneManagerBindingEvent";
import { SceneRegistryEvent } from "./SceneRegistryEvent";

/**
 * @private
 */
export class SceneRegistry extends EventDispatcher {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _rootBindings: SceneManagerBinding[] = [];
    private _bindings: SceneManagerBinding[] = [];
    private _bindingBySceneManager: Map<Phaser.Scenes.SceneManager, SceneManagerBinding> = new Map<
        Phaser.Scenes.SceneManager,
        SceneManagerBinding
    >();

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    /**
     * @private
     */
    public get rootBindings(): SceneManagerBinding[] {
        return this._rootBindings;
    }

    /**
     * @private
     */
    public get bindings(): SceneManagerBinding[] {
        return this._bindings;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addSceneManager(sceneManager: Phaser.Scenes.SceneManager): SceneManagerBinding {
        let binding: SceneManagerBinding = this._bindingBySceneManager.get(sceneManager);

        if (!binding) {
            binding = this.createBinding(sceneManager);
            this._bindingBySceneManager.set(sceneManager, binding);
        }

        return binding;
    }

    /**
     * @private
     */
    public removeSceneManager(sceneManager: Phaser.Scenes.SceneManager): SceneManagerBinding {
        let binding: SceneManagerBinding = this._bindingBySceneManager.get(sceneManager);

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
    public findParentBinding(target: Phaser.Scenes.SceneManager): SceneManagerBinding {
        return null;
    }

    /**
     * @private
     */
    public getBinding(sceneManager: Phaser.Scenes.SceneManager): SceneManagerBinding {
        return this._bindingBySceneManager.get(sceneManager);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private createBinding(sceneManager: Phaser.Scenes.SceneManager): SceneManagerBinding {
        let binding: SceneManagerBinding = new SceneManagerBinding(sceneManager);
        this._bindings.push(binding);

        // Add a listener so that we can remove this binding when it has no handlers
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, this.onBindingEmpty);

        // If the new binding doesn't have a parent it is a Root
        binding.parent = this.findParentBinding(sceneManager);
        if (binding.parent == null) {
            this.addRootBinding(binding);
        }

        this.dispatchEvent(new SceneRegistryEvent(SceneRegistryEvent.SCENE_MANAGER_ADD, binding.sceneManager));

        return binding;
    }

    private removeBinding(binding: SceneManagerBinding): void {
        // Remove the binding itself
        this._bindingBySceneManager.delete(binding.sceneManager);
        let index: number = this._bindings.indexOf(binding);
        this._bindings.splice(index, 1);

        // Drop the empty binding listener
        binding.removeEventListener(SceneManagerBindingEvent.BINDING_EMPTY, this.onBindingEmpty);

        if (!binding.parent) {
            // This binding didn't have a parent, so it was a Root
            this.removeRootBinding(binding);
        }

        this.dispatchEvent(new SceneRegistryEvent(SceneRegistryEvent.SCENE_MANAGER_REMOVE, binding.sceneManager));
    }

    private addRootBinding(binding: SceneManagerBinding): void {
        this._rootBindings.push(binding);
        this.dispatchEvent(new SceneRegistryEvent(SceneRegistryEvent.ROOT_SCENE_MANAGER_ADD, binding.sceneManager));
    }

    private removeRootBinding(binding: SceneManagerBinding): void {
        let index: number = this._rootBindings.indexOf(binding);
        this._rootBindings.splice(index, 1);
        this.dispatchEvent(new SceneRegistryEvent(SceneRegistryEvent.ROOT_SCENE_MANAGER_REMOVE, binding.sceneManager));
    }

    private onBindingEmpty(event: SceneManagerBindingEvent): void {
        this.removeBinding(<any>event.target);
    }
}
