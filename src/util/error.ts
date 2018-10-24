/**
 * @author WMXPY
 * @namespace Util
 * @description Error
 */

export enum ERROR_CODE {
    UNKNOWN_ERROR = 1000,
    INSUFFICIENT_ARGUMENT = 3412,
    USED_OPTION = 3425,
    TWO_OPTION_IN_A_ROW = 3516,
    LAST_OPTION_NOT_FULFILLED_CONFLICT = 3517,
    LAST_OPTION_NOT_FULFILLED_OVERFLOW = 3518,
    OPTION_VALUE_IS_A_SYMBOL = 3519,
    REST_NOT_ACTIVATED = 3520,
    INTERNAL_ERROR = 9001,
}

export const errorList: {
    [key: number]: string;
} = {
    1000: 'Unknown error',
    3412: 'Insufficient argument',
    3425: 'Option is used',
    3516: 'Two option symbol in a row',
    3517: 'Last option cannot be fulfilled (conflict)',
    3518: 'Last option cannot be fulfilled (overflow)',
    3519: 'Option value is a symbol',
    3520: 'Rest not activated',
    9001: 'Internal error',
};

/**
 * return new error string object of target error code
 *
 * @param {number} code
 * @returns {Error}
 */
export const error = (code: ERROR_CODE): Error => {
    const newError: Error = new Error();
    if (errorList[code]) {
        newError.message = code + ': ' + errorList[code];
        newError.name = errorList[code];
        (newError as any).code = code;

        return newError;
    }
    newError.message = code + ': ' + errorList[9001];
    newError.name = errorList[9001];
    (newError as any).code = 9001;

    if ((newError as any).code > 9001) {
        console.log(newError);
    }

    return newError;
};
