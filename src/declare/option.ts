/**
 * @author WMXPY
 * @namespace Declare
 * @description Option
 */

import { PATTERN_TYPE } from "./pattern";

export interface IOption {
    optionOnly?: boolean;
    args?: {
        [key: string]: {
            type: PATTERN_TYPE;
        };
    };
    options?: {
        [key: string]: {
            name?: string;
            symbol?: string;
            type: PATTERN_TYPE;
        };
    };
}
