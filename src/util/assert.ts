/**
 * @author WMXPY
 * @namespace Util
 * @description Assert
 */

import { error, ERROR_CODE } from "#util/error";

class Assert<T> {
    private _element: T | undefined;
    public constructor(element: T | undefined) {
        this._element = element;
    }

    public exist(code?: ERROR_CODE): Assert<T> {
        if (this._element !== null && this._element !== undefined) {
            return this;
        }
        throw error(code || ERROR_CODE.INTERNAL_ERROR);
    }

    public value(): T {
        return this._element as T;
    }
}

export const assert = <T>(element: T | undefined) => {
    return new Assert<T>(element);
};
