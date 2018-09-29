/**
 * @author WMXPY
 * @namespace Parser
 * @description Index
 */

import { ICommand } from "#declare/command";
import { splitInput } from "#parser/input";
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

    public raw(): ICommand {
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
}

export default Parser;
