/**
 * @author WMXPY
 * @namespace Parser
 * @description Index
 */

import { ICommand } from "#declare/command";
import { splitInput } from "#parser/input";

export class Parser {
    private _input: string;

    public constructor(input: string) {
        this._input = input;
    }

    public raw(): ICommand {
        const raw: string[] = splitInput(this._input);
        if (raw.length <= 0) {
            return {
                command: '',
                args: [],
            };
        }

        return {
            command: '',
            args: [],
        };
    }
}

export default Parser;
