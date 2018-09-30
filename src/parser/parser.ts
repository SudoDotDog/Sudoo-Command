/**
 * @author WMXPY
 * @namespace Parser
 * @description Parser
 */

import { IRawCommand } from "#declare/command";
import { IPatternArg, IPatternOption } from "#declare/pattern";
import { splitInput } from "#parser/input";
import { Pattern } from "#pattern/pattern";
import { car, cdr } from "#util/array";
import { assert } from "#util/assert";

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

    public args<T>(pattern: Pattern): { [P in keyof T]?: string } {
        const raw: string[] = splitInput(this._input);
        const empty: { [P in keyof T]?: string } = {};
        if (raw.length <= 0) return empty;

        const args: string[] = assert(cdr(raw)).exist().value();
        args.forEach((arg: string) => {
            const current: IPatternArg | IPatternOption = pattern.match(arg);

        });
        return {};
    }
}

export default Parser;
