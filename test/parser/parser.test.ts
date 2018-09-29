/**
 * @author WMXPY
 * @namespace Parser
 * @description Parser Test
 */

require('../../src/binding');
import { Parser } from '#parser/parser';
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
});
