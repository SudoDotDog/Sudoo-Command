/**
 * @author WMXPY
 * @namespace Declare
 * @description Pattern
 */

export enum PATTERN_TYPE {
    STRING = 'STRING',
    INTEGER = 'INTEGER',
    FLOAT = 'FLOAT',
    BOOLEAN = 'BOOLEAN',
}

export interface IPatternArg {
    name: string;
    type: PATTERN_TYPE;
}

export interface IPatternOption {
    name: string;
    symbol: string;
    type: PATTERN_TYPE;
}
