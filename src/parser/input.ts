/**
 * @author WMXPY
 * @namespace Parser
 * @description Input
 */

export const splitInput: (input: string) => string[] = (input: string): string[] => {
    return (input.match(/\"\S[^\"]*\"|\S+/g) || [])
        .map((str) => str.replace(/\"/g, ''))
        .filter((s: string) => Boolean(s.trim()));
};
