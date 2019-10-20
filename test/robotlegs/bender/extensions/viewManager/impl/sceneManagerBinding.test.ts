// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { IClass } from "@robotlegsjs/core";

import { ISceneHandler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/api/ISceneHandler";
import { IViewHandler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/api/IViewHandler";
import { SceneManagerBinding } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/SceneManagerBinding";
import { SceneManagerBindingEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/SceneManagerBindingEvent";

import { CallbackSceneHandler } from "../support/CallbackSceneHandler";
import { CallbackViewHandler } from "../support/CallbackViewHandler";
import { MockGame } from "../support/MockGame";
import { MockScene } from "../support/MockScene";
import { MockView } from "../support/MockView";

describe("SceneManagerBinding", () => {
    let game: MockGame = null;
    let scene: MockScene = null;
    let view: MockView = null;
    let sceneManager: Phaser.Scenes.SceneManager = null;
    let binding: SceneManagerBinding = null;

    before(done => {
        game = new MockGame();
        scene = new MockScene("theScene");

        sceneManager = game.scene;

        game.events.on(scene.sceneId + "Created", () => {
            view = scene.view;
            done();
        });

        game.scene.add(scene.sceneId, scene, true);
    });

    beforeEach(() => {
        binding = new SceneManagerBinding(sceneManager);
    });

    afterEach(() => {
        binding = null;
    });

    after(() => {
        game.destroy(true);
        game = null;
        scene = null;
        view = null;
        sceneManager = null;
    });

    it("scene_manager_is_stored", () => {
        assert.equal(binding.sceneManager, sceneManager);
    });

    it("scene_handler_is_invoked", () => {
        let callCount: number = 0;
        binding.addSceneHandler(
            new CallbackSceneHandler((s: Phaser.Scene, t: IClass<any>): void => {
                callCount++;
            })
        );
        binding.handleScene(scene, <IClass<any>>scene.constructor);
        assert.equal(callCount, 1);
    });

    it("scene_handler_is_passing_correct_details", () => {
        const expectedScene: Phaser.Scene = scene;
        const expectedType: IClass<any> = <IClass<any>>scene.constructor;
        let actualScene: Phaser.Scene = null;
        let actualType: IClass<any> = null;
        binding.addSceneHandler(
            new CallbackSceneHandler((s: Phaser.Scene, t: IClass<any>): void => {
                actualScene = s;
                actualType = t;
            })
        );
        binding.handleScene(scene, <IClass<any>>scene.constructor);
        assert.equal(actualScene, expectedScene);
        assert.equal(actualType, expectedType);
    });

    it("scene_handler_is_not_invoked_after_removal", () => {
        let callCount: number = 0;
        const handler: ISceneHandler = new CallbackSceneHandler((s: Phaser.Scene, t: IClass<any>): void => {
            callCount++;
        });
        binding.addSceneHandler(handler);
        binding.removeSceneHandler(handler);
        binding.handleScene(scene, <IClass<any>>scene.constructor);
        assert.equal(callCount, 0);
    });

    it("scene_handler_is_not_invoked_multiple_times_when_added_multiple_times", () => {
        let callCount: number = 0;
        const handler: ISceneHandler = new CallbackSceneHandler((s: Phaser.Scene, t: IClass<any>): void => {
            callCount++;
        });
        binding.addSceneHandler(handler);
        binding.addSceneHandler(handler);
        binding.addSceneHandler(handler);
        binding.handleScene(scene, <IClass<any>>scene.constructor);
        assert.equal(callCount, 1);
    });

    it("scene_handlers_are_invoked_in_order", () => {
        const expected: string[] = ["handler1", "handler2", "handler3"];
        let actual: string[] = [];
        binding.addSceneHandler(
            new CallbackSceneHandler((s: Phaser.Scene, t: IClass<any>): void => {
                actual.push("handler1");
            })
        );
        binding.addSceneHandler(
            new CallbackSceneHandler((s: Phaser.Scene, t: IClass<any>): void => {
                actual.push("handler2");
            })
        );
        binding.addSceneHandler(
            new CallbackSceneHandler((s: Phaser.Scene, t: IClass<any>): void => {
                actual.push("handler3");
            })
        );
        binding.handleScene(scene, <IClass<any>>scene.constructor);
        assert.deepEqual(actual, expected);
    });

    it("scene_handler_binding_fires_event_on_empty", () => {
        const handler: ISceneHandler = new CallbackSceneHandler();
        let callCount: number = 0;
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, (event: SceneManagerBindingEvent): void => {
            callCount++;
        });
        binding.addSceneHandler(handler);
        binding.removeSceneHandler(handler);
        assert.equal(callCount, 1);
    });

    it("scene_handler_event_on_empty_is_not_invoked_multiple_times_when_handler_is_removed_multiple_times", () => {
        const handler: ISceneHandler = new CallbackSceneHandler();
        let callCount: number = 0;
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, (event: SceneManagerBindingEvent): void => {
            callCount++;
        });
        binding.addSceneHandler(handler);
        binding.removeSceneHandler(handler);
        binding.removeSceneHandler(handler);
        binding.removeSceneHandler(handler);
        assert.equal(callCount, 1);
    });

    it("scene_handler_binding_event_on_empty_fired_once_when_more_than_one_handler_is_added", () => {
        const handler1: ISceneHandler = new CallbackSceneHandler();
        const handler2: ISceneHandler = new CallbackSceneHandler();
        const handler3: ISceneHandler = new CallbackSceneHandler();
        let callCount: number = 0;
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, (event: SceneManagerBindingEvent): void => {
            callCount++;
        });
        binding.addSceneHandler(handler1);
        binding.addSceneHandler(handler2);
        binding.addSceneHandler(handler3);
        binding.removeSceneHandler(handler1);
        binding.removeSceneHandler(handler2);
        binding.removeSceneHandler(handler3);
        assert.equal(callCount, 1);
    });

    it("view_handler_is_invoked", () => {
        let callCount: number = 0;
        binding.addViewHandler(
            new CallbackViewHandler((v: Phaser.GameObjects.Container, t: IClass<any>): void => {
                callCount++;
            })
        );
        binding.handleView(scene.view, <IClass<any>>scene.view.constructor);
        assert.equal(callCount, 1);
    });

    it("view_handler_is_passing_correct_details", () => {
        const expectedView: MockView = view;
        const expectedType: IClass<any> = <IClass<any>>view.constructor;
        let actualView: MockView = null;
        let actualType: IClass<any> = null;
        binding.addViewHandler(
            new CallbackViewHandler((v: Phaser.GameObjects.Container, t: IClass<any>): void => {
                actualView = v;
                actualType = t;
            })
        );
        binding.handleView(scene.view, <IClass<any>>scene.view.constructor);
        assert.equal(actualView, expectedView);
        assert.equal(actualType, expectedType);
    });

    it("view_handler_is_not_invoked_after_removal", () => {
        let callCount: number = 0;
        const handler: IViewHandler = new CallbackViewHandler((v: Phaser.GameObjects.Container, t: IClass<any>): void => {
            callCount++;
        });
        binding.addViewHandler(handler);
        binding.removeViewHandler(handler);
        binding.handleView(scene.view, <IClass<any>>scene.view.constructor);
        assert.equal(callCount, 0);
    });

    it("view_handler_is_not_invoked_multiple_times_when_added_multiple_times", () => {
        let callCount: number = 0;
        const handler: IViewHandler = new CallbackViewHandler((v: Phaser.GameObjects.Container, t: IClass<any>): void => {
            callCount++;
        });
        binding.addViewHandler(handler);
        binding.addViewHandler(handler);
        binding.addViewHandler(handler);
        binding.handleView(scene.view, <IClass<any>>scene.view.constructor);
        assert.equal(callCount, 1);
    });

    it("view_handlers_are_invoked_in_order", () => {
        const expected: string[] = ["handler1", "handler2", "handler3"];
        let actual: string[] = [];
        binding.addViewHandler(
            new CallbackViewHandler((v: Phaser.GameObjects.Container, t: IClass<any>): void => {
                actual.push("handler1");
            })
        );
        binding.addViewHandler(
            new CallbackViewHandler((v: Phaser.GameObjects.Container, t: IClass<any>): void => {
                actual.push("handler2");
            })
        );
        binding.addViewHandler(
            new CallbackViewHandler((v: Phaser.GameObjects.Container, t: IClass<any>): void => {
                actual.push("handler3");
            })
        );
        binding.handleView(scene.view, <IClass<any>>scene.view.constructor);
        assert.deepEqual(actual, expected);
    });

    it("view_handler_binding_fires_event_on_empty", () => {
        const handler: IViewHandler = new CallbackViewHandler();
        let callCount: number = 0;
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, (event: SceneManagerBindingEvent): void => {
            callCount++;
        });
        binding.addViewHandler(handler);
        binding.removeViewHandler(handler);
        assert.equal(callCount, 1);
    });

    it("view_handler_event_on_empty_is_not_invoked_multiple_times_when_handler_is_removed_multiple_times", () => {
        const handler: IViewHandler = new CallbackViewHandler();
        let callCount: number = 0;
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, (event: SceneManagerBindingEvent): void => {
            callCount++;
        });
        binding.addViewHandler(handler);
        binding.removeViewHandler(handler);
        binding.removeViewHandler(handler);
        binding.removeViewHandler(handler);
        assert.equal(callCount, 1);
    });

    it("view_handler_binding_event_on_empty_fired_once_when_more_than_one_handler_is_added", () => {
        const handler1: IViewHandler = new CallbackViewHandler();
        const handler2: IViewHandler = new CallbackViewHandler();
        const handler3: IViewHandler = new CallbackViewHandler();
        let callCount: number = 0;
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, (event: SceneManagerBindingEvent): void => {
            callCount++;
        });
        binding.addViewHandler(handler1);
        binding.addViewHandler(handler2);
        binding.addViewHandler(handler3);
        binding.removeViewHandler(handler1);
        binding.removeViewHandler(handler2);
        binding.removeViewHandler(handler3);
        assert.equal(callCount, 1);
    });

    it("binding_empty_is_not_fired_when_scene_handler_is_not_removed", () => {
        const sceneHandler: ISceneHandler = new CallbackSceneHandler();
        const viewHandler: IViewHandler = new CallbackViewHandler();
        let callCount: number = 0;
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, (event: SceneManagerBindingEvent): void => {
            callCount++;
        });
        binding.addSceneHandler(sceneHandler);
        binding.addViewHandler(viewHandler);
        binding.removeViewHandler(viewHandler);
        assert.equal(callCount, 0);
    });

    it("binding_empty_is_not_fired_when_view_handler_is_not_removed", () => {
        const sceneHandler: ISceneHandler = new CallbackSceneHandler();
        const viewHandler: IViewHandler = new CallbackViewHandler();
        let callCount: number = 0;
        binding.addEventListener(SceneManagerBindingEvent.BINDING_EMPTY, (event: SceneManagerBindingEvent): void => {
            callCount++;
        });
        binding.addSceneHandler(sceneHandler);
        binding.addViewHandler(viewHandler);
        binding.removeSceneHandler(sceneHandler);
        assert.equal(callCount, 0);
    });
});
