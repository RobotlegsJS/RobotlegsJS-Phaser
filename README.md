# RobotlegsJS Phaser Extension

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/RobotlegsJS/RobotlegsJS-Phaser/blob/master/LICENSE)
[![Gitter chat](https://badges.gitter.im/RobotlegsJS/RobotlegsJS.svg)](https://gitter.im/RobotlegsJS/RobotlegsJS)
[![Build Status](https://secure.travis-ci.org/RobotlegsJS/RobotlegsJS-Phaser.svg?branch=master)](https://travis-ci.org/RobotlegsJS/RobotlegsJS-Phaser)
[![codebeat badge](https://codebeat.co/badges/75c0995f-d238-4d43-99a7-cc883bb0dd88)](https://codebeat.co/projects/github-com-robotlegsjs-robotlegsjs-phaser-master)
[![Maintainability](https://api.codeclimate.com/v1/badges/3d3a971a95d7d97d6b32/maintainability)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Phaser/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3d3a971a95d7d97d6b32/test_coverage)](https://codeclimate.com/github/RobotlegsJS/RobotlegsJS-Phaser/test_coverage)
[![npm version](https://badge.fury.io/js/%40robotlegsjs%2Fphaser.svg)](https://badge.fury.io/js/%40robotlegsjs%2Fphaser)
[![Greenkeeper badge](https://badges.greenkeeper.io/RobotlegsJS/RobotlegsJS-Phaser.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Integrate [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
framework with [Phaser](https://github.com/photonstorm/phaser).

## Installation

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/phaser --save-prod
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/phaser
```

From version `0.2.0` of this package, the [Phaser](https://github.com/photonstorm/phaser) dependency was moved to **peerDependencies**,
allowing the final user to choose the desired version of the `phaser` library on each project.

The `@robotlegsjs/phaser` package is compatible with versions between the `>=3.11.0 <4` version range of `phaser` library.

As example, when you would like to use the version `3.11.0` of `phaser` library, you can run:

```bash
npm install phaser@3.11.0 reflect-metadata --save-prod
```

or

```bash
yarn add phaser@3.11.0 reflect-metadata
```

Then follow the [installation instructions](https://github.com/RobotlegsJS/RobotlegsJS/blob/master/README.md#installation) of **RobotlegsJS** library to complete the setup of your project.

**Dependencies**

+ [RobotlegsJS](https://github.com/RobotlegsJS/RobotlegsJS)
+ [tslib](https://github.com/Microsoft/tslib)

**Peer Dependencies**

+ [Phaser](https://github.com/photonstorm/phaser)
+ [reflect-metadata](https://github.com/rbuckton/reflect-metadata)

## Usage

```ts
/// <reference path="../node_modules/@robotlegsjs/phaser/definitions/phaser.d.ts" />

import "reflect-metadata";

import { Context, IContext, MVCSBundle } from "@robotlegsjs/core";

import { ContextSceneManager, PhaserBundle } from "@robotlegsjs/phaser";

import { GameConfig } from "./config/GameConfig";
import { SceneMediatorConfig } from "./config/SceneMediatorConfig";

import { SceneKey } from "./constants/SceneKey";

import { Boot } from "./scenes/Boot";
import { Main } from "./scenes/Main";
import { Preload } from "./scenes/Preload";

export class Game extends Phaser.Game {
    private _context: IContext;

    constructor() {
        super({
            type: Phaser.CANVAS,
            width: 800,
            height: 600,
            backgroundColor: "#010101",
            parent: "phaser-example"
        });

        this._context = new Context();
        this._context
            .install(MVCSBundle, PhaserBundle)
            .configure(new ContextSceneManager(this.scene))
            .configure(SceneMediatorConfig)
            .configure(GameConfig)
            .initialize();

        this.scene.add(SceneKey.BOOT, new Boot());
        this.scene.add(SceneKey.PRELOAD, new Preload());
        this.scene.add(SceneKey.MAIN, new Main());

        this.scene.start(SceneKey.BOOT);
    }
}
```

[See example](example)

## Running the example

Run the following commands to run the example:

```bash
npm install
npm start
```

or:

```bash
yarn install
yarn start
```

## RobotlegsJS integration with Phaser CE (Community Edition)

The `@robotlegsjs/phaser` package was updated to support [Phaser v3](https://www.npmjs.com/package/phaser) plugin.

If you are looking for integration with [Phaser CE](https://github.com/photonstorm/phaser-ce) you can use the [RobotlegsJS-Phaser-CE](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE) plugin.

## License

[MIT](LICENSE)
