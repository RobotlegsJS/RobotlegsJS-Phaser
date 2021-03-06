# RobotlegsJS Phaser Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Suggestions or improvements for further versions

- [ ] Improve how mediators for `Phaser.Scene` and `Phaser.GameObjects.Container` are handled:

  - [ ] Improve how `SceneMediators` are created and destroyed based on how `Phaser.Scenes.SceneManager` is handling scenes.

  - [ ] Improve how `ViewMediators` are created and destroyed based on how `Phaser.Scene` and `Phaser.GameObjects.Container` are handled.

- [ ] Use [**Function Types**](https://www.typescriptlang.org/docs/handbook/functions.html) for handlers and callbacks instead of generic **Function** type.

- [ ] Evaluate if **IMediator** interface should be mandatory.

- [ ] Improve Code Coverage to reach 100%.

- [ ] Migrate [original documentation](https://github.com/robotlegs/robotlegs-framework/blob/master/src/readme.md) and adapt it to TypeScript and Phaser.

## [Unreleased]

<!--
Types of changes:

#### Added
- for new features.

#### Changed
- for changes in existing functionality.

#### Deprecated
- for soon-to-be removed features.

#### Removed
- for now removed features.

#### Fixed
- for any bug fixes.

#### Security
- in case of vulnerabilities.
-->

## RobotlegsJS Phaser 3.0.0

### [v3.0.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/3.0.0) - 2020-03-14

#### Breaking Change

- Update `phaser` to version `3.22.0` (see #112).

  - `@robotlegsjs/eventemitter3` package is not necessary anymore, you should remove this dependency from your `package.json` and use the extension `LocalEventEmitterMap` from `@robotlegsjs/phaser` package.

  - `eventemitter3` package is not necessary anymore, you should remove this dependency from your `package.json` and use the definitions from `Phaser.Events.EventEmitter` package instead. Notice that the type of your listeners must change from `EventEmitter.ListenerFn` to `Function`.

  - For compatibility with previous versions of `phaser`, use `@robotlegsjs/phaser` version 2.

- Update [`@robotlegsjs/core`](https://github.com/RobotlegsJS/RobotlegsJS) to version `^2.0.0` (see #111 and #118).

  - Migrate array notation from `Array<SomeType>` to `SomeType[]`.

  - The rest of the `Public API` remains unchanged.

#### Added

- Add **Tidelift** as funding option (see #113).

- Add **Enterprise Support** information (see #114).

- Deploy example project (see #67).

#### Changed

- Update `tslib` to version `1.11.1` (see #116).

- Update dev dependencies to latest version.

#### Security

- Migrate to [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) to solve security vulnerability (see #111).

## RobotlegsJS Phaser 2.0.0

### [v2.0.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/2.0.0) - 2019-10-31

#### Breaking Change

- Update `phaser` to version `3.20.1` (see #104).

  - `definitions` folder removed, since `phaser` package is now providing native type definitions.

  - Use the type definitions from `/node_modules/phaser/types/phaser.d.ts`.

  - Remember to add `"scripthost"` to `lib` array in `compilerOptions` on your `tsconfig.json` file.

  - Minimum version supported is `3.17.0`. Previous versions doens't have the `phaser/types` folder.

#### Changed

- Update `@robotlegsjs/core` to version `1.0.3` (see #105).

- Update `@robotlegsjs/eventemitter3` to version `1.0.2` (see #107).

- Improve `prettier` rules and `autoformat` script (see #85).

- Enable `"editor.formatOnSave"` rule for `VS Code` (see #85).

- Migrate project to `travis-ci.com`.

- Update `codebeat` Project UUID.

- Update dev dependencies to latest version.

## RobotlegsJS Phaser 1.0.0

### [v1.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/1.0.1) - 2018-12-25

#### Changed

- Add mediator when scene has been started after stop/shutdown (see #79).

- Update dev dependencies to latest version.

### [v1.0.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/1.0.0) - 2018-11-26

#### Changed

- Update `@robotlegsjs/core` to version `1.0.0` (see #74).

- Update `@robotlegsjs/eventemitter3` to version `1.0.0` (see #75).

- Update `phaser` to version `3.15.1` (see #68).

- Migrate to Headless Chrome and improve performance of Karma (see #69).

- Prepare package for stable version (see #70).

- Improve webpack configuration used to run example project. The `npm start` script will generate hashed files (to avoid browser cache) and open the broswer automatically (see #71).

- Update GitHub Templates (see #73).

- Update dev dependencies to latest version.

## RobotlegsJS Phaser 0.4.0

### [v0.4.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.4.0) - 2018-09-14

#### Changed

- Enable view listeners on `SceneMediator` and `ViewMediator` classes (see #56 and #59).

  - Methods `addViewListener` and `removeViewListener` were removed from scene and view mediators.

  - Added `on`, `once` and `off` methods to the scene and view mediators allowing the mediators to handle events dispatched by `EventEmitter` views.

  - Signature `addContextListener` and `removeContextListener` changed in order to fully support the `IEventDispatcher` interface.

  - New methods `addDomListener` and `removeDomListener` were added to add support to `DOM` events dispatched by an `EventTarget`.

- Update dev dependencies to latest version.

## RobotlegsJS Phaser 0.3.0

### [v0.3.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.3.0) - 2018-09-10

#### Changed

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
    - Class `SceneMediatorStateHandler` renamed to `SceneMediatorHandler`

  - Package `sceneManager` renamed to `viewManager`

- Update `karma` setup to generate code coverage report only for `src` folder (see #53).

- Update dev dependencies to latest version.

## RobotlegsJS Phaser 0.2.0

### [v0.2.0](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.2.0) - 2018-08-07

#### Added

- Add changelog (see #35).

- Add code of conduct (see #36).

- Add issue template (see #38).

- Add pull request template (see #39).

#### Changed

- Implement support for [phaser](https://github.com/photonstorm/phaser) plugin version 3. Suppor for [phaser-ce](https://github.com/photonstorm/phaser-ce) plugin was moved to [RobotlegsJS-Phaser-CE](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE) (see #52).

- Move `phaser` library to **peerDependencies**, allowing the final user to choose the desired version of the [phaser](https://github.com/photonstorm/phaser) library on each project (see #52).

- Update `@robotlegsjs/core` to version `0.2.0` (see #51).

- Update codeclimate settings (see #40).

- Update Prettier rules (see #41).

- Use `rimraf` instead of `rm -rf` (see #42).

- Update TypeScript Compiler Options (see #43, #49).

- Use [tslib](https://github.com/Microsoft/tslib) library to avoid duplicated declarations (see #49).

- Enforce TSLint rules (see #44).

- Adopts year-agnostic copyright message (see #47).

- Update dev dependencies to latest version.

#### Removed

- Remove `eventemitter3` dependency (see #45).

## RobotlegsJS Phaser 0.0.1

### [v0.0.5](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.5) - 2017-09-26

#### Changed

- Update `@robotlegsjs/core` to version `0.0.6` (see #9).

- Update `phaser-ce` to version `2.8.8` (see #10).

- Adapt to NPM [v5.0.0](http://blog.npmjs.org/post/161081169345/v500) (see #7).

- Update dev dependencies to latest version.

### [v0.0.4](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.4) - 2017-09-15

#### Added

- Add support to [Prettier](https://prettier.io) code formatter (see #6).

- Add integration with [CodeBeat](https://codebeat.co) (see #6).

#### Changed

- Update `@robotlegsjs/core` to version `0.0.5` (see #5).

- Update `phaser-ce` to version `2.8.7` (see #6).

- Update TSLint rules (see #6).

- Update dev dependencies to latest version.

### [v0.0.3](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.3) - 2017-08-30

#### Changed

- Update `@robotlegsjs/core` to version `0.0.4` (see #4).

- Update `phaser-ce` to version `2.8.4`.

- Enable GreenKeeper.

- Update dev dependencies to latest version.

### [v0.0.2](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.2) - 2017-08-12

#### Changed

- Update `@robotlegsjs/core` to version `0.0.3`.

- Update contributing guidelines.

- Update dev dependencies to latest version.

### [v0.0.1](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/releases/tag/0.0.1) - 2017-08-06

- The version **0.0.1** integrated version **2.8.3** of [**phaser-ce**](https://www.npmjs.com/package/phaser-ce) package.
