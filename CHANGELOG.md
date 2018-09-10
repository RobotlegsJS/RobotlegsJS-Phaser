# RobotlegsJS Phaser Changelog:

## RobotlegsJS Phaser 1.0.0

### v1.0.0 - Planned stable version

- [ ] Improve how mediators for `Phaser.Scene` and `Phaser.GameObjects.Container` are handled:

  - [ ] Improve how `SceneMediators` are created and destroyed based on how `Phaser.Scenes.SceneManager` is handling scenes.

  - [ ] Improve how `ViewMediators` are created and destroyed based on how `Phaser.Scene` and `Phaser.GameObjects.Container` are handled.

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [ ] Evaluate if **IMediator** interface should be mandatory.

- [ ] Improve Code Coverage to reach 100%.

- [ ] Migrate [original documentation](https://github.com/robotlegs/robotlegs-framework/blob/master/src/readme.md) and adapt it to TypeScript and Phaser.

## RobotlegsJS Phaser 0.3.0

### v0.3.0

Major Breaking Changes:
---

- Add support for `Phaser.GameObject.Container`, allowing the creation of mediators for `Phaser.Scene` and `Phaser.GameObjects.Container` (see #54 and #55).

  - Package `sceneMediatorMap` renamed to `mediatorMap`
    - Interface `ISceneMediator` renamed to `IMediator`
    - Interface `ISceneMediatorMapping` renamed to `IMediatorMapping`
    - Interface `ISceneMediatorConfigurator` renamed to `IMediatorConfigurator`
    - Interface `ISceneMediatorMapper` renamed to `IMediatorMapper`
    - Interface `ISceneMediatorUnmapper` renamed to `IMediatorUnmapper`
    - Class `NullSceneMediatorUnmapper` renamed to `NullMediatorUnmapper`
    - Class `SceneMediatorMapper` renamed to `MediatorMapper`
    - Class `SceneMediatorMapping` renamed to `MediatorMapping`
    - Class `SceneMediatorStateHandler` renamed to `MediatorSceneHandler`

  - Package `sceneManager` renamed to `viewManager`

Features Or Improvements:
---

- Update `karma` setup to generate code coverage report only for `src` folder (see #53).

- Update dev dependencies to latest version.

## RobotlegsJS Phaser 0.2.0

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.2.0) - 2018-08-07

Major Breaking Changes:
---

- Implement support for [phaser](https://github.com/photonstorm/phaser) plugin version 3. Suppor for [phaser-ce](https://github.com/photonstorm/phaser-ce) plugin was moved to [RobotlegsJS-Phaser-CE](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE) (see #52).

- Move `phaser` library to **peerDependencies**, allowing the final user to choose the desired version of the [phaser](https://github.com/photonstorm/phaser) library on each project (see #52).

- Update `@robotlegsjs/core` to version `0.2.0` (see #51).

- Remove `eventemitter3` dependency (see #45).

Features Or Improvements:
---

- Add changelog (see #35).

- Add code of conduct (see #36).

- Add issue template (see #38).

- Add pull request template (see #39).

- Update codeclimate settings (see #40).

- Update Prettier rules (see #41).

- Use `rimraf` instead of `rm -rf` (see #42).

- Update TypeScript Compiler Options (see #43, #49).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see #49).

- Enforce TSLint rules (see #44).

- Adopts year-agnostic copyright message (see #47).

- Update dev dependencies to latest version.

## RobotlegsJS Phaser 0.0.1

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.5) - 2017-09-26

- Update `@robotlegsjs/core` to version `0.0.6` (see #9).

- Update `phaser-ce` to version `2.8.8` (see #10).

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #7).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.4) - 2017-09-15

- Update `@robotlegsjs/core` to version `0.0.5` (see #5).

- Update `phaser-ce` to version `2.8.7` (see #6).

- Update TSLint rules (see #6).

- Add support to [Prettier](https://prettier.io) code formatter (see #6).

- Add integration with [CodeBeat](https://codebeat.co) (see #6).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.3) - 2017-08-30

- Update `@robotlegsjs/core` to version `0.0.4` (see #4).

- Update `phaser-ce` to version `2.8.4`.

- Enable GreenKeeper.

- Update dev dependencies to latest version.

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.2) - 2017-08-12

- Update `@robotlegsjs/core` to version `0.0.3`.

- Update contributing guidelines.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.1) - 2017-08-06

- The version **0.0.1** integrated version **2.8.3** of [**phaser-ce**](https://www.npmjs.com/package/phaser-ce) package.
