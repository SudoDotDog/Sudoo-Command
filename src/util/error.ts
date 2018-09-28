/**
 * @author WMXPY
 * @namespace Util_Error
 * @description Index
 */

export enum ERROR_CODE {
    INTERNAL_ERROR = 9001,
}

export const errorList: {
    [key: number]: string;
} = {
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
