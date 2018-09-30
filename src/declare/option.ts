/**
 * @author WMXPY
 * @namespace Declare
 * @description Option
 */

import { PATTERN_TYPE } from "#declare/pattern";

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
            type: PATTERN_TYPE;
        };
    };
}
