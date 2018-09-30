/**
 * @author WMXPY
 * @namespace Pattern
 * @description Pattern
 */

import { IPatternArg, IPatternOption, PATTERN_RESULT, PATTERN_RESULT_TYPE, PATTERN_TYPE } from "#declare/pattern";
import { assert } from "#util/assert";
import { error, ERROR_CODE } from "#util/error";

interface IPatternOptionExtend extends IPatternOption {
    used: boolean;
}

export class Pattern {
    private _args: IPatternArg[];
    private _options: IPatternOptionExtend[];

    public constructor(args?: IPatternArg[], options?: IPatternOption[]) {
        this._args = args ? [...args] : [];
        this._options = this._convert(options ? [...options] : []);
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
            used: false,
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
    public match(str: string): PATTERN_RESULT {

        // option
        for (const option of this._options) {
            if (option.symbol === str) {
                if (option.used) throw error(ERROR_CODE.USED_OPTION);
                option.used = true;
                return {
                    type: PATTERN_RESULT_TYPE.OPTION,
                    value: {
                        name: option.name,
                        symbol: option.symbol,
                        type: option.type,
                    },
                };
            }
        }

        // arg
        const arg: IPatternArg = assert(this._args.shift()).exist(ERROR_CODE.INSUFFICIENT_ARGUMENT).value();
        return {
            type: PATTERN_RESULT_TYPE.ARG,
            value: arg,
        };
    }

    public verify(): boolean {
        return this._args.length === 0;
    }

    public clone(): Pattern {
        return new Pattern(this._args, this._options);
    }

    public getArgs(): IPatternArg[] {
        return this._args;
    }

    public getOptions(): IPatternOption[] {
        return this._options.map((value: IPatternOptionExtend): IPatternOption => {
            return {
                name: value.name,
                symbol: value.symbol,
                type: value.type,
            };
        });
    }

    protected _convert(options: IPatternOption[]): IPatternOptionExtend[] {
        return options.map((value: IPatternOption): IPatternOptionExtend => {
            return {
                ...value,
                used: false,
            };
        });
    }
}
