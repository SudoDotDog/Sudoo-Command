/**
 * @author WMXPY
 * @fileoverview Util Error Test
 */

require('../../src/binding');
import { error, ERROR_CODE } from '#util/error';
import { expect } from 'chai';

describe('test error utils', (): void => {
    describe('test error generators', (): void => {
        it('error a error code should return target error', (): void => {
            const result = error(ERROR_CODE.UNKNOWN_ERROR);
            expect(result.message).to.be.equal('1000: Unknown error');
        });
    });
});
