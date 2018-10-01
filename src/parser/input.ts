/**
 * @author WMXPY
 * @namespace Parser
 * @description Input
 */

import { IInput } from "#declare/input";

export const splitInput: (input: string) => IInput[] =
    (input: string): IInput[] =>
        (input.match(/\"\S[^\"]*\"|\S+/g) || [])
            .filter((s: string) => Boolean(s.trim()))
            .map((str: string): IInput => {
                if (
                    str.substring(0, 1) === '"' &&
                    str.substring(str.length - 1, str.length) === '"'
                ) {
                    return {
                        value: str.substring(1, str.length - 1),
                        native: true,
                    };
                } else {
                    return {
                        value: str,
                        native: false,
                    };
                }
            })
            .filter((i: IInput) => Boolean(i.value));
