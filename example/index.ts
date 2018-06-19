/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import "reflect-metadata";

import { Game } from "./Game";

(<any>window).initGame = function() {
    let game: Game = new Game(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio,
        Phaser.AUTO
    );
    (<any>window).game = game;
};
