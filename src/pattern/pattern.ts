/**
 * @author WMXPY
 * @namespace Pattern
 * @description Pattern
 */

import { IPatternArg, IPatternOption, PATTERN_TYPE } from "#declare/pattern";

export class Pattern {
    private _args: IPatternArg[];
    private _options: IPatternOption[];

    public constructor() {
        this._args = [];
        this._options = [];
    }

    public arg(name: string, type: PATTERN_TYPE): Pattern {
        this._args.push({
            name,
            type,
        });
        return this;
    }

    public option(name: string, symbol: string, type: PATTERN_TYPE): Pattern {
        this._options.push({
            name,
            symbol,
            type,
        });
        return this;
    }
}
