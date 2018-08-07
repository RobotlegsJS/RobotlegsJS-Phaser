// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ILogger, ITypeFilter, IClass } from "@robotlegsjs/core";

import { ISceneMediatorMapping } from "../api/ISceneMediatorMapping";
import { ISceneMediatorConfigurator } from "../dsl/ISceneMediatorConfigurator";
import { ISceneMediatorMapper } from "../dsl/ISceneMediatorMapper";
import { ISceneMediatorUnmapper } from "../dsl/ISceneMediatorUnmapper";

import { SceneMediatorStateHandler } from "./SceneMediatorStateHandler";
import { SceneMediatorMapping } from "./SceneMediatorMapping";

/**
 * @private
 */
export class SceneMediatorMapper implements ISceneMediatorMapper, ISceneMediatorUnmapper {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mappings: Map<IClass<any>, ISceneMediatorMapping> = new Map<IClass<any>, ISceneMediatorMapping>();

    private _typeFilter: ITypeFilter;

    private _handler: SceneMediatorStateHandler;

    private _logger: ILogger;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(typeFilter: ITypeFilter, handler: SceneMediatorStateHandler, logger?: ILogger) {
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
    public toMediator(mediatorClass: IClass<any>): ISceneMediatorConfigurator {
        let mapping: ISceneMediatorMapping = this._mappings.get(mediatorClass);
        return mapping ? this.overwriteMapping(mapping) : this.createMapping(mediatorClass);
    }

    /**
     * @inheritDoc
     */
    public fromMediator(mediatorClass: IClass<any>): void {
        let mapping: ISceneMediatorMapping = this._mappings.get(mediatorClass);
        if (mapping) {
            this.deleteMapping(mapping);
        }
    }

    /**
     * @inheritDoc
     */
    public fromAll(): void {
        this._mappings.forEach(this.deleteMapping, this);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private createMapping(mediatorClass: IClass<any>): SceneMediatorMapping {
        let mapping: SceneMediatorMapping = new SceneMediatorMapping(this._typeFilter, mediatorClass);
        this._handler.addMapping(mapping);
        this._mappings.set(mediatorClass, mapping);
        if (this._logger) {
            this._logger.debug("{0} mapped to {1}", [this._typeFilter, mapping]);
        }
        return mapping;
    }

    private deleteMapping(mapping: ISceneMediatorMapping): void {
        this._handler.removeMapping(mapping);
        this._mappings.delete(mapping.mediatorClass);
        if (this._logger) {
            this._logger.debug("{0} unmapped from {1}", [this._typeFilter, mapping]);
        }
    }

    private overwriteMapping(mapping: ISceneMediatorMapping): ISceneMediatorConfigurator {
        if (this._logger) {
            this._logger.warn(
                "{0} already mapped to {1}\n" +
                    'If you have overridden this mapping intentionally you can use "unmap()" ' +
                    "prior to your replacement mapping in order to avoid seeing this message.\n",
                [this._typeFilter, mapping]
            );
        }
        this.deleteMapping(mapping);
        return this.createMapping(mapping.mediatorClass);
    }
}
