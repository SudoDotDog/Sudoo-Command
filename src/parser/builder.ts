/**
 * @author WMXPY
 * @namespace Parser
 * @description Builder
 */

import { PATTERN_TYPE } from "#declare/pattern";

export class Builder<T> {
    private _result: { [P in keyof T]: any };

    public constructor() {
        this._result = {} as { [P in keyof T]: any };
    }

    public get result(): { [P in keyof T]: any } {
        return this._result;
    }

    public add(name: keyof T, value: string, type: PATTERN_TYPE): Builder<T> {
        this._result[name] = this._typeConvert(value, type);
        return this;
    }

    protected _typeConvert(value: string, type: PATTERN_TYPE): any {
        switch (type) {
            case PATTERN_TYPE.BOOLEAN:
                return value.toLowerCase() === 'true';
            case PATTERN_TYPE.FLOAT:
                return parseFloat(value) || 0;
            case PATTERN_TYPE.INTEGER:
                return parseInt(value, 10) || 0;
            case PATTERN_TYPE.STRING:
            default:
                return value;
        }
    }
}
