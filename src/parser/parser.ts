/**
 * @author WMXPY
 * @namespace Parser
 * @description Parser
 */

import { IRawCommand } from "#declare/command";
import { IPatternArg, IPatternOption, PATTERN_RESULT, PATTERN_RESULT_TYPE, PATTERN_TYPE } from "#declare/pattern";
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

        const result: { [P in keyof T]: any } = {} as { [P in keyof T]: any };
        const args: string[] = assert(cdr(raw)).exist().value();
        args.reduce<IPatternOption | null>(
            (previous: IPatternOption | null, arg: string):
                IPatternOption | null => {
                if (previous) {
                    result[previous.name as keyof T] = this.typeConvert(arg, previous.type);
                    return null;
                }

                const current: PATTERN_RESULT = pattern.match(arg);
                if (current.type === PATTERN_RESULT_TYPE.OPTION) {
                    if (previous) throw error(ERROR_CODE.TWO_OPTION_IN_A_ROW);
                    const value: IPatternOption = current.value;

                    if (value.type === PATTERN_TYPE.BOOLEAN) result[value.name as keyof T] = true;
                    else return value;
                } else {
                    const value: IPatternArg = current.value;
                    result[value.name as keyof T] = this.typeConvert(arg, value.type);
                }
                return null;
            }, null);
        return result;
    }

    protected typeConvert(value: string, type: PATTERN_TYPE): any {
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

export default Parser;
