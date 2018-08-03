RobotlegsJS Phaser Extension
===

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

Installation
---

You can get the latest release and the type definitions using [NPM](https://www.npmjs.com/):

```bash
npm install @robotlegsjs/phaser --save-prod
```

Or using [Yarn](https://yarnpkg.com/en/):

```bash
yarn add @robotlegsjs/phaser
````

Usage
---

```ts
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import "reflect-metadata";

import { Context, IContext, MVCSBundle } from "@robotlegsjs/core";
import { PhaserBundle, ContextStateManager } from "@robotlegsjs/phaser";

import { StateKey } from "./constants/StateKey";

import { Boot } from "./states/Boot";
import { Preload } from "./states/Preload";
import { GameTitle } from "./states/GameTitle";
import { Main } from "./states/Main";
import { GameOver } from "./states/GameOver";

import { GameConfig } from "./config/GameConfig";
import { StateMediatorConfig } from "./config/StateMediatorConfig";

class Game extends Phaser.Game {

    private _context: IContext;

    constructor() {

        super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

        this._context = new Context();
        this._context.install(MVCSBundle, PhaserBundle)
            .configure(new ContextStateManager(this.state))
            .configure(StateMediatorConfig)
            .configure(GameConfig)
            .initialize();

        this.state.add(StateKey.BOOT, Boot, false);
        this.state.add(StateKey.PRELOAD, Preload, false);
        this.state.add(StateKey.GAME_TITLE, GameTitle, false);
        this.state.add(StateKey.MAIN, Main, false);
        this.state.add(StateKey.GAME_OVER, GameOver, false);

        this.state.start(StateKey.BOOT);
    }
}

new Game();
```

[See example](example)

RobotlegsJS integration with Phaser CE (Community Edition)
---

The `@robotlegsjs/phaser` package was updated to support [Phaser v3](https://www.npmjs.com/package/phaser) plugin.

If you are looking for integration with [Phaser CE](https://github.com/photonstorm/phaser-ce) you can use the [RobotlegsJS-Phaser-CE](https://github.com/RobotlegsJS/RobotlegsJS-Phaser-CE) plugin.

License
---

[MIT](LICENSE)
