/**
 * @author WMXPY
 * @namespace Pattern
 * @description Pattern Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { PATTERN_RESULT_TYPE, PATTERN_TYPE } from '../../src/declare/pattern';
import { Pattern } from '../../src/pattern/pattern';

describe('Given a <Pattern> Class', (): void => {
    const chance: Chance.Chance = new Chance('test-pattern-pattern');
    it('create a pattern', (): void => {
        const pattern: Pattern = new Pattern();

        // tslint:disable-next-line
        expect(pattern).to.be.not.null;
        expect(pattern.getArgs()).to.be.deep.equal([]);
        expect(pattern.getOptions()).to.be.deep.equal([]);
    });

    describe('build pattern', (): void => {
        it('should be able add arg', (): void => {
            const arg1: string = chance.string();
            const arg2: string = chance.string();
            const pattern: Pattern = new Pattern();
            pattern.arg(arg1, PATTERN_TYPE.STRING);
            pattern.arg(arg2, PATTERN_TYPE.INTEGER);

            expect(pattern.getArgs()).to.be.deep.equal([
                {
                    name: arg1,
                    type: PATTERN_TYPE.STRING,
                },
                {
                    name: arg2,
                    type: PATTERN_TYPE.INTEGER,
                },
            ]);
        });
    });

    describe('match', (): void => {
        it('should be able handle complex situation', (): void => {
            const arg1: string = chance.string();
            const arg2: string = chance.string();
            const pattern: Pattern = new Pattern();
            pattern.arg(arg1, PATTERN_TYPE.STRING);
            pattern.arg(arg2, PATTERN_TYPE.INTEGER);

            const option1: string = chance.string();
            const option2: string = chance.string();
            pattern.option(option1, '-s', PATTERN_TYPE.STRING);
            pattern.option(option2, '-b', PATTERN_TYPE.BOOLEAN);

            expect(pattern.match('hello')).to.be.deep.equal({
                type: PATTERN_RESULT_TYPE.ARG,
                value: {
                    name: arg1,
                    type: PATTERN_TYPE.STRING,
                },
            });
            expect(pattern.match('-b')).to.be.deep.equal({
                type: PATTERN_RESULT_TYPE.OPTION,
                value: {
                    name: option2,
                    symbol: '-b',
                    type: PATTERN_TYPE.BOOLEAN,
                },
            });
        });
    });
});
