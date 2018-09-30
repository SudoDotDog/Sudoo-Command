/**
 * @author WMXPY
 * @namespace Parser
 * @description Parser
 */

import { IRawCommand } from "#declare/command";
import { IPatternArg, IPatternOption, PATTERN_RESULT, PATTERN_RESULT_TYPE, PATTERN_TYPE } from "#declare/pattern";
import { Builder } from "#parser/builder";
import { splitInput } from "#parser/input";
import { Pattern } from "#pattern/pattern";
import { car, cdr } from "#util/array";
import { assert } from "#util/assert";
import { error, ERROR_CODE } from "#util/error";

export class Parser {
    private _input: string;

    public constructor(input: string) {
        this._input = input;
    }

    public get input(): string {
        return this._input;
    }

    public raw(): IRawCommand {
        const raw: string[] = splitInput(this._input);
        if (raw.length <= 0) {
            return {
                command: '',
                args: [],
            };
        }

        const command: string = assert(car(raw)).exist().value();
        const args: string[] = assert(cdr(raw)).exist().value();

        return {
            command,
            args,
        };
    }

    public command(): string {
        const raw: string[] = splitInput(this._input);
        const emptyString: string = '';
        if (raw.length <= 0) return emptyString;
        const command: string = assert(car(raw)).exist().value();
        return command;
    }

    public args<T>(pattern: Pattern): { [P in keyof T]: any } {
        const raw: string[] = splitInput(this._input);
        const empty: { [P in keyof T]: any } = {} as { [P in keyof T]: any };
        if (raw.length <= 0) return empty;

        const args: string[] = assert(cdr(raw)).exist().value();

        const builder: Builder<T> = new Builder<T>();
        const reducer = this._createReducer<T>(builder, pattern);
        args.reduce<IPatternOption | null>(reducer, null);
        assert(pattern.verify()).to.be.true(ERROR_CODE.INSUFFICIENT_ARGUMENT);
        return builder.result;
    }

    protected _createReducer<T>(builder: Builder<T>, pattern: Pattern) {
        const reducer = (previous: IPatternOption | null, arg: string):
            IPatternOption | null => {
            if (previous) {
                builder.add(previous.name as keyof T, arg, previous.type);
                return null;
            }

            const current: PATTERN_RESULT = pattern.match(arg);
            if (current.type === PATTERN_RESULT_TYPE.OPTION) {
                if (previous) throw error(ERROR_CODE.TWO_OPTION_IN_A_ROW);
                const value: IPatternOption = current.value;

                if (value.type === PATTERN_TYPE.BOOLEAN) {
                    builder.add(value.name as keyof T, 'true', PATTERN_TYPE.BOOLEAN);
                } else return value;
            } else {
                const value: IPatternArg = current.value;
                builder.add(value.name as keyof T, arg, value.type);
            }
            return null;
        };
        return reducer;
    }
}

export default Parser;
