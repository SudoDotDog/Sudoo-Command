/**
 * @author WMXPY
 * @namespace Util
 * @description Array
 */

export const car = <T>(arr: T[]): T | undefined => {
    return arr[0] || undefined;
};

export const cdr = <T>(arr: T[]): T[] | undefined => {
    if (arr.length < 1) {
        return undefined;
    }
    return arr.slice(1, arr.length);
};
