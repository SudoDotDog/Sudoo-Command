/**
 * @author WMXPY
 * @description Sudoo Command
 */

require('./binding');
import { IOption } from '#declare/option';
import { Parser } from '#parser/parser';
import { Pattern } from '#pattern/pattern';
import { isArray } from 'util';

export const SCommand = (input: string, optionOnly?: boolean): string => {
    const parser = new Parser(input);
    return parser.command(optionOnly);
};

export const SArgs = <T>(
    input: string,
    option: IOption,
): T => {
    const pattern: Pattern = new Pattern();
    if (option.args && isArray(option.args)) {
        for (const key of Object.keys(option.args)) {
            if (option.args[key].type) {
                pattern.arg(
                    key,
                    option.args[key].type,
                );
            }
        }
    }

    if (option.options && isArray(option.options)) {
        for (const key of Object.keys(option.options)) {
            if (option.options[key].type) {
                pattern.option(
                    key,
                    option.options[key].name || key,
                    option.options[key].type,
                );
            }
        }
    }

    const parser: Parser = new Parser(input);
    return parser.args<T>(pattern, option.optionOnly);
};

export { Parser as SParser, Pattern as SPattern, IOption as ISArgsOption };
