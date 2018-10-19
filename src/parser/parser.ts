/**
 * @author WMXPY
 * @namespace Parser
 * @description Parser
 */


import { IRawCommand } from "../declare/command";
import { IInput } from "../declare/input";
import { IPatternArg, IPatternOption, PATTERN_RESULT, PATTERN_RESULT_TYPE, PATTERN_TYPE } from "../declare/pattern";
import { Pattern } from "../pattern/pattern";
import { car, cdr } from "../util/array";
import { assert } from "../util/assert";
import { error, ERROR_CODE } from "../util/error";
import { Builder } from "./builder";
import { splitInput } from "./input";

export class Parser {
    private _input: string;

    public constructor(input: string) {
        this._input = input;
    }

    public get input(): string {
        return this._input;
    }

    public raw(): IRawCommand {
        const raw: string[] = splitInput(this._input).map((input: IInput) => input.value);
        const emptyString: string = '';

        if (raw.length <= 0) {
            return {
                command: emptyString,
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

    public command(optionOnly?: boolean): string {
        const raw: IInput[] = splitInput(this._input);
        const emptyString: string = '';

        if (raw.length <= 0) return emptyString;
        const command: string = assert(car(raw)).exist().value().value;
        if (optionOnly && command.substring(0, 1) === '-') return emptyString;
        return command;
    }

    public args<T>(pattern: Pattern, optionOnly?: boolean): { [P in keyof T]: any } {
        const raw: IInput[] = splitInput(this._input);
        const empty: { [P in keyof T]: any } = {} as { [P in keyof T]: any };
        if (raw.length <= 0) return empty;

        const command: string = this.command(optionOnly);
        const args: IInput[] =
            command ?
                assert(cdr(raw)).exist().value() :
                assert(raw).exist().value();

        const builder: Builder<T> = new Builder<T>();
        const reducer = this._createReducer<T>(builder, pattern);
        const overflow: IPatternOption | null = args.reduce<IPatternOption | null>(reducer, null);
        if (overflow) throw error(ERROR_CODE.LAST_OPTION_NOT_FULFILLED_OVERFLOW);

        assert(pattern.verify()).to.be.true(ERROR_CODE.INSUFFICIENT_ARGUMENT);
        return builder.result;
    }

    protected _createReducer<T>(builder: Builder<T>, pattern: Pattern) {
        const reducer = (
            previous: IPatternOption | null,
            arg: IInput,
            index: number,
            array: IInput[],
        ): IPatternOption | null => {
            if (previous) {
                if (pattern.isOption(arg)) throw error(ERROR_CODE.OPTION_VALUE_IS_A_SYMBOL);
                builder.add(previous.name as keyof T, arg.value, previous.type);
                return null;
            }

            const current: PATTERN_RESULT = pattern.match(arg.value);
            if (current.type === PATTERN_RESULT_TYPE.OPTION) {
                if (previous) throw error(ERROR_CODE.TWO_OPTION_IN_A_ROW);
                const value: IPatternOption = current.value;

                if (value.type === PATTERN_TYPE.BOOLEAN) {
                    builder.add(value.name as keyof T, 'true', PATTERN_TYPE.BOOLEAN);
                } else {
                    if (index === array.length) {
                        throw error(ERROR_CODE.LAST_OPTION_NOT_FULFILLED_CONFLICT);
                    }
                    return value;
                }
            } else {
                const value: IPatternArg = current.value;
                builder.add(value.name as keyof T, arg.value, value.type);
            }
            return null;
        };
        return reducer;
    }
}

export default Parser;
