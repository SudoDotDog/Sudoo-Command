/**
 * @author WMXPY
 * @description Sudoo Command
 */

require('./binding');
import { Parser as SudooParser } from '#parser/parser';
import { Pattern as SudooPattern } from '#pattern/pattern';

export const createPattern = (): SudooPattern => {
    return new SudooPattern();
};

export const createParser = (input: string): SudooParser => {
    return new SudooParser(input);
};
