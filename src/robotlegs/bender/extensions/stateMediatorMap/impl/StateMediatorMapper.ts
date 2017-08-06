// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    ILogger,
    ITypeFilter
} from "robotlegs";

import { IStateMediatorMapping } from "../api/IStateMediatorMapping";
import { IStateMediatorConfigurator } from "../dsl/IStateMediatorConfigurator";
import { IStateMediatorMapper } from "../dsl/IStateMediatorMapper";
import { IStateMediatorUnmapper } from "../dsl/IStateMediatorUnmapper";

import { StateMediatorStateHandler } from "./StateMediatorStateHandler";
import { StateMediatorMapping } from "./StateMediatorMapping";

/**
 * @private
 */
export class StateMediatorMapper implements IStateMediatorMapper, IStateMediatorUnmapper {

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappings: Map<any, IStateMediatorMapping> = new Map<any, IStateMediatorMapping>();

    private _typeFilter: ITypeFilter;

    private _handler: StateMediatorStateHandler;

    private _logger: ILogger;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(typeFilter: ITypeFilter, handler: StateMediatorStateHandler, logger?: ILogger) {
        this._typeFilter = typeFilter;
        this._handler = handler;
        this._logger = logger;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public toMediator(mediatorClass: any): IStateMediatorConfigurator {
        let mapping: IStateMediatorMapping = this._mappings[<any>mediatorClass];
        return mapping
            ? this.overwriteMapping(mapping)
            : this.createMapping(mediatorClass);
    }

    /**
     * @inheritDoc
     */
    public fromMediator(mediatorClass: any): void {
        let mapping: IStateMediatorMapping = this._mappings[<any>mediatorClass];
        if (mapping) {
            this.deleteMapping(mapping);
        }
    }

    /**
     * @inheritDoc
     */
    public fromAll(): void {
        for (let i in this._mappings) {
            let mapping: IStateMediatorMapping = this._mappings[i];
            this.deleteMapping(mapping);
        }
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private createMapping(mediatorClass: any): StateMediatorMapping {
        let mapping: StateMediatorMapping = new StateMediatorMapping(this._typeFilter, mediatorClass);
        this._handler.addMapping(mapping);
        this._mappings[<any>mediatorClass] = mapping;
        if (this._logger) {
            this._logger.debug('{0} mapped to {1}', [this._typeFilter, mapping]);
        }
        return mapping;
    }

    private deleteMapping(mapping: IStateMediatorMapping): void {
        this._handler.removeMapping(mapping);
        delete this._mappings[<any>mapping.mediatorClass];
        if (this._logger) {
            this._logger.debug('{0} unmapped from {1}', [this._typeFilter, mapping]);
        }
    }

    private overwriteMapping(mapping: IStateMediatorMapping): IStateMediatorConfigurator {
        if (this._logger) {
            this._logger.warn('{0} already mapped to {1}\n' +
                'If you have overridden this mapping intentionally you can use "unmap()" ' +
                'prior to your replacement mapping in order to avoid seeing this message.\n',
                [this._typeFilter, mapping]);
        }
        this.deleteMapping(mapping);
        return this.createMapping(mapping.mediatorClass);
    }
}
