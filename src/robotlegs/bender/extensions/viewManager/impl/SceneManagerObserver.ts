// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { SceneManagerBinding } from "./SceneManagerBinding";
import { SceneRegistry } from "./SceneRegistry";
import { SceneRegistryEvent } from "./SceneRegistryEvent";

/**
 * @private
 */
export class SceneManagerObserver {
    private _registry: SceneRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(sceneRegistry: SceneRegistry) {
        this._registry = sceneRegistry;

        // We only care about roots
        this._registry.addEventListener(SceneRegistryEvent.ROOT_SCENE_MANAGER_ADD, this.onRootSceneManagerAdd, this);
        this._registry.addEventListener(SceneRegistryEvent.ROOT_SCENE_MANAGER_REMOVE, this.onRootSceneManagerRemove, this);

        // We might have arrived late on the scene
        this._registry.rootBindings.forEach((binding: SceneManagerBinding) => {
            this.addRootListener(binding.sceneManager);
        });
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public destroy(): void {
        this._registry.removeEventListener(SceneRegistryEvent.ROOT_SCENE_MANAGER_ADD, this.onRootSceneManagerAdd, this);
        this._registry.removeEventListener(SceneRegistryEvent.ROOT_SCENE_MANAGER_REMOVE, this.onRootSceneManagerRemove, this);

        this._registry.rootBindings.forEach((binding: SceneManagerBinding) => {
            this.removeRootListener(binding.sceneManager);
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onRootSceneManagerAdd(event: SceneRegistryEvent): void {
        this.addRootListener(event.sceneManager);
    }

    private onRootSceneManagerRemove(event: SceneRegistryEvent): void {
        this.removeRootListener(event.sceneManager);
    }

    private addRootListener(sceneManager: Phaser.Scenes.SceneManager): void {
        if (sceneManager) {
            (sceneManager as any).createSceneFromInstance = this.patchCreateSceneMethod(
                sceneManager,
                (sceneManager as any).createSceneFromInstance
            );
            (sceneManager as any).createSceneFromFunction = this.patchCreateSceneMethod(
                sceneManager,
                (sceneManager as any).createSceneFromFunction
            );
            (sceneManager as any).createSceneFromObject = this.patchCreateSceneMethod(
                sceneManager,
                (sceneManager as any).createSceneFromObject
            );

            this.patchGameObjectFactoryAddExistingMethod(sceneManager);
        }
    }

    private patchGameObjectFactoryAddExistingMethod(sceneManager: Phaser.Scenes.SceneManager) {
        const originalMethod: (child: Phaser.GameObjects.GameObject) => Phaser.GameObjects.GameObject =
            Phaser.GameObjects.GameObjectFactory.prototype.existing;

        const self = this;

        Phaser.GameObjects.GameObjectFactory.prototype.existing = function(child: Phaser.GameObjects.GameObject) {
            if (child instanceof Phaser.GameObjects.Container) {
                let binding: SceneManagerBinding = self._registry.getBinding(sceneManager);
                if (binding) {
                    binding.handleView(child, <any>child.constructor);
                }
            }
            return originalMethod.apply((child as any).scene.sys.add, arguments);
        };
    }

    private patchCreateSceneMethod(sceneManager: Phaser.Scenes.SceneManager, originalMethod: any): (...args: any[]) => Phaser.Scene {
        return (...args) => {
            const scene: Phaser.Scene = originalMethod.apply(sceneManager, args);
            this.onSceneInit(scene);
            return scene;
        };
    }

    private onSceneInit(scene: Phaser.Scene): void {
        let rootBindings: SceneManagerBinding[] = this._registry.rootBindings;
        let sceneManager: Phaser.Scenes.SceneManager;

        for (const rootBinding of rootBindings) {
            sceneManager = rootBinding.sceneManager;

            if (sceneManager) {
                let binding: SceneManagerBinding = this._registry.getBinding(scene.sys.game.scene);
                if (binding) {
                    // this.events.emit('resume', this);
                    // this.events.emit('wake', this);
                    // this.events.emit('start', this);
                    scene.sys.events.on("start", this.onSceneStart, this);
                }
            }
        }
    }

    private onSceneStart(sys: Phaser.Scenes.Systems): void {
        sys.events.off("start", this.onSceneStart, this, false);
        const binding: SceneManagerBinding = this._registry.getBinding(sys.game.scene);
        if (binding) {
            binding.handleScene(sys.scene, <any>sys.scene.constructor);
        }
    }

    private removeRootListener(container: any): void {}
}
