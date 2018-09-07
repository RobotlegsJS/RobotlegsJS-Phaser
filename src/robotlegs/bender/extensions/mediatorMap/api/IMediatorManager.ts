import { IMediatorMapping } from "./IMediatorMapping";

export const IMediatorManager = Symbol("IMediatorManager");

export interface IMediatorManager {
    addMediator(mediator: any, item: any, mapping: IMediatorMapping): void;

    removeMediator(mediator: any, item: any, mapping: IMediatorMapping): void;
}
