// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { ILogger, ITypeFilter, IClass } from "@robotlegsjs/core";

import { IMediatorMapping } from "../api/IMediatorMapping";
import { IMediatorConfigurator } from "../dsl/IMediatorConfigurator";
import { IMediatorMapper } from "../dsl/IMediatorMapper";
import { IMediatorUnmapper } from "../dsl/IMediatorUnmapper";

import { MediatorStateHandler } from "./MediatorStateHandler";
import { SceneMediatorMapping } from "./SceneMediatorMapping";

/**
 * @private
 */
export class MediatorMapper implements IMediatorMapper, IMediatorUnmapper {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    protected _mappings: Map<IClass<any>, IMediatorMapping> = new Map<IClass<any>, IMediatorMapping>();

    protected _typeFilter: ITypeFilter;

    protected _handler: MediatorStateHandler;

    protected _logger: ILogger;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(typeFilter: ITypeFilter, handler: MediatorStateHandler, logger?: ILogger) {
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
    public toMediator(mediatorClass: IClass<any>): IMediatorConfigurator {
        let mapping: IMediatorMapping = this._mappings.get(mediatorClass);
        return mapping ? this.overwriteMapping(mapping) : this.createMapping(mediatorClass);
    }

    /**
     * @inheritDoc
     */
    public fromMediator(mediatorClass: IClass<any>): void {
        let mapping: IMediatorMapping = this._mappings.get(mediatorClass);
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
    /* protected Functions                                                          */
    /*============================================================================*/

    protected createMapping(mediatorClass: IClass<any>): SceneMediatorMapping {
        let mapping: SceneMediatorMapping = new SceneMediatorMapping(this._typeFilter, mediatorClass);
        this._handler.addMapping(mapping);
        this._mappings.set(mediatorClass, mapping);
        if (this._logger) {
            this._logger.debug("{0} mapped to {1}", [this._typeFilter, mapping]);
        }
        return mapping;
    }

    protected deleteMapping(mapping: IMediatorMapping): void {
        this._handler.removeMapping(mapping);
        this._mappings.delete(mapping.mediatorClass);
        if (this._logger) {
            this._logger.debug("{0} unmapped from {1}", [this._typeFilter, mapping]);
        }
    }

    protected overwriteMapping(mapping: IMediatorMapping): IMediatorConfigurator {
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
