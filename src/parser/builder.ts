/**
 * @author WMXPY
 * @namespace Parser
 * @description Builder
 */

import { PATTERN_TYPE } from "../declare/pattern";
import { error, ERROR_CODE } from "../util/error";

export class Builder<T> {

    private _result: { [P in keyof T]: any };
    private _rest: string | null;

    public constructor(rest?: string) {

        this._result = {} as { [P in keyof T]: any };
        this._rest = rest || null;
    }

    public get result(): { [P in keyof T]: any } {

        return this._result;
    }

    public add(name: keyof T, value: string, type: PATTERN_TYPE): Builder<T> {

        this._result[name] = this._typeConvert(value, type);
        return this;
    }

    public rest(value: string): Builder<T> {

        if (!this._rest) {
            throw error(ERROR_CODE.REST_NOT_ACTIVATED);
        }

        if ((this._result as any)[this._rest] instanceof Array) {

            (this._result as any)[this._rest].push(this._typeConvert(value, PATTERN_TYPE.STRING));
        } else {

            (this._result as any)[this._rest] = [this._typeConvert(value, PATTERN_TYPE.STRING)];
        }
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
