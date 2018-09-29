/**
 * @author WMXPY
 * @namespace Pattern
 * @description Pattern
 */

import { IPatternArg, IPatternOption, PATTERN_TYPE } from "#declare/pattern";
import { assert } from "#util/assert";

export class Pattern {
    private _args: IPatternArg[];
    private _options: IPatternOption[];

    public constructor(args?: IPatternArg[], options?: IPatternOption[]) {
        this._args = args ? [...args] : [];
        this._options = options ? [...options] : [];
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

    /**
     * SIDE EFFECT
     *
     * @param {string} str
     * @returns {(IPatternOption | IPatternArg)}
     * @memberof Pattern
     */
    public match(str: string): IPatternOption | IPatternArg {

        // option
        for (let i: number = 0; i < this._options.length; i++) {
            const option: IPatternOption = this._options[i];
            if (option.symbol === str) {
                return this._options.splice(i, 1)[0];
            }
        }

        // arg
        const arg: IPatternArg =
            assert(this._args.shift())
                .exist()
                .value();
        return arg;
    }

    public clone(): Pattern {
        return new Pattern(this._args, this._options);
    }

    public getArgs(): IPatternArg[] {
        return this._args;
    }

    public getOptions(): IPatternOption[] {
        return this._options;
    }
}