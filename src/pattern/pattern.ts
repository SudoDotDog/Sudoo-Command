/**
 * @author WMXPY
 * @namespace Pattern
 * @description Pattern
 */

import { IPatternArg, IPatternOption } from "#declare/pattern";

export class Pattern {
    private _args: IPatternArg[];
    private _options: IPatternOption[];

    public constructor() {
        this._args = [];
        this._options = [];
    }
}
