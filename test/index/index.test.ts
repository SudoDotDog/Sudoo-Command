/**
 * @author WMXPY
 * @namespace Index
 * @description Index Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { PATTERN_TYPE } from '../../src/declare/pattern';
import { SArgs, SCommand } from '../../src/index';

describe('Given a <Index> function', (): void => {
    const chance: Chance.Chance = new Chance('test-index-index');

    describe('test index simple SCommand', (): void => {
        it('should can return correct command', (): void => {
            const command: string = chance.string();
            const result = SCommand(`${command} test`);
            expect(result).to.be.equal(command);
        });

        it('should can return empty string if arg is empty', (): void => {
            const result = SCommand(``);
            expect(result).to.be.equal('');
        });

        it('should can return empty string with option if is option only', (): void => {
            const result = SCommand(`-b a`, true);
            expect(result).to.be.equal('');
        });

        it('should return option symbol if option only is not correct settled', (): void => {
            const result = SCommand(`-b a`);
            expect(result).to.be.equal('-b');
        });
    });

    describe('test index simple SArgs', (): void => {
        it('should can return correct command', (): void => {
            const command: string = chance.string();
            const arg1: string = chance.string();

            const result = SArgs(`${command} ${arg1}`, {
                args: {
                    hello: { type: PATTERN_TYPE.STRING },
                },
            });
            expect(result).to.be.deep.equal({
                hello: arg1,
            });
        });

        it('should can return correct options', (): void => {
            const command: string = chance.string();
            const option1: string = chance.string();
            const option2: string = chance.string();
            const option3: string = chance.string();

            const result = SArgs(`${command} -b ${option1} -c ${option2} -w ${option3}`, {
                options: {
                    '-b': { type: PATTERN_TYPE.STRING },
                    '-c': {
                        name: 'hello',
                        type: PATTERN_TYPE.STRING,
                    },
                    'world': {
                        symbol: '-w',
                        type: PATTERN_TYPE.STRING,
                    },
                },
            });
            expect(result).to.be.deep.equal({
                'hello': option2,
                'world': option3,
                '-b': option1,
            });
        });
    });
});
