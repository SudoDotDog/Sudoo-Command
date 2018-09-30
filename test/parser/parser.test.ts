/**
 * @author WMXPY
 * @namespace Parser
 * @description Parser Test
 */

require('../../src/binding');
import { PATTERN_TYPE } from '#declare/pattern';
import { Parser } from '#parser/parser';
import { Pattern } from '#pattern/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';

describe('Given a <Parser> Class', (): void => {
    const chance: Chance.Chance = new Chance('test-parser-parser');
    it('create a parser', (): void => {
        const str: string = chance.string();
        const parser: Parser = new Parser(str);

        // tslint:disable-next-line
        expect(parser).to.be.not.null;
        expect(parser.input).to.be.equal(str);
    });

    describe('raw function', (): void => {
        it('should return empty if string is empty', (): void => {
            const parser: Parser = new Parser('');

            expect(parser.raw()).to.be.deep.equal({
                command: '',
                args: [],
            });
        });

        it('should return a command', (): void => {
            const str: string = chance.string();
            const parser: Parser = new Parser(str);

            expect(parser.raw()).to.be.deep.equal({
                command: str,
                args: [],
            });
        });

        it('should return a parsed list of args', (): void => {
            const str: string = chance.string();
            const strList: string[] = [
                str,
                str,
                '-s',
                str,
                '-p',
                str,
            ];
            const parser: Parser = new Parser(strList.join(' '));

            expect(parser.raw()).to.be.deep.equal({
                command: str,
                args: [
                    str, '-s', str, '-p', str,
                ],
            });
        });
    });

    const createPattern = (name: string): Pattern => {
        const arg1: string = name + '-arg-1';
        const arg2: string = name + '-arg-2';
        const pattern: Pattern = new Pattern();
        pattern.arg(arg1, PATTERN_TYPE.STRING);
        pattern.arg(arg2, PATTERN_TYPE.INTEGER);

        const option1: string = name + '-option-1';
        const option2: string = name + '-option-2';
        pattern.option(option1, '-s', PATTERN_TYPE.STRING);
        pattern.option(option2, '-b', PATTERN_TYPE.BOOLEAN);

        return pattern;
    };

    describe('args and command function', (): void => {
        it('should able to handle complex situation', (): void => {
            const str: string = chance.string();
            const arg1: string = chance.string();
            const arg2: number = chance.integer();
            const option1: string = chance.string();

            const pattern: Pattern = createPattern('test');
            const list: any[] = [
                str,
                arg1,
                '-b',
                arg2,
                '-s',
                option1,
            ];

            const parser: Parser = new Parser(list.join(' '));
            const command: string = parser.command();

            expect(command).to.be.equal(str);

            const args = parser.args<{
                'test-arg-1': string;
                'test-arg-2': number;
                'test-option-1': string;
                'test-option-2': boolean;
            }>(pattern);

            expect(args).to.be.deep.equal({
                'test-arg-1': arg1,
                'test-arg-2': arg2,
                'test-option-1': option1,
                'test-option-2': true,
            });
        });

        it('should throw error when have doubled option', (): void => {
            const str: string = chance.string();
            const arg1: string = chance.string();
            const arg2: number = chance.integer();
            const option1: string = chance.string();

            const pattern: Pattern = createPattern('test');
            const list: any[] = [
                str,
                arg1,
                '-b',
                arg2,
                '-b',
                option1,
            ];

            const parser: Parser = new Parser(list.join(' '));
            const command: string = parser.command();

            expect(command).to.be.equal(str);

            const execute = (): void => {
                parser.args<{
                    'test-arg-1': string;
                    'test-arg-2': number;
                    'test-option-1': string;
                    'test-option-2': boolean;
                }>(pattern);
            };

            expect(execute).to.be.throw('3425: Option is used');
        });
    });
});
