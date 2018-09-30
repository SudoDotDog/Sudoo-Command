/**
 * @author WMXPY
 * @namespace Declare
 * @description Pattern
 */

export enum PATTERN_RESULT_TYPE {
    ARG = 'ARG',
    OPTION = 'OPTION',
}

export enum PATTERN_TYPE {
    STRING = 'STRING',
    INTEGER = 'INTEGER',
    FLOAT = 'FLOAT',
    BOOLEAN = 'BOOLEAN',
}

export type PATTERN_RESULT = {
    type: PATTERN_RESULT_TYPE.ARG,
    value: IPatternArg,
} | {
    type: PATTERN_RESULT_TYPE.OPTION,
    value: IPatternOption,
};

export interface IPatternArg {
    name: string;
    type: PATTERN_TYPE;
}

export interface IPatternOption {
    name: string;
    symbol: string;
    type: PATTERN_TYPE;
}
