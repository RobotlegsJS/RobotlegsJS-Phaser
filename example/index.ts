/// <reference path="../definitions/phaser.d.ts" />

import "reflect-metadata";
import { Game } from "./Game";

(<any>window).initGame = function() {
    let game: Game = new Game();
    (<any>window).game = game;
};
