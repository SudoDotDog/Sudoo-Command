/**
 * @author WMXPY
 * @namespace Parser
 * @description Index Test
 */

require('../../src/binding');
import { Parser } from '#parser/parser';
import { expect } from 'chai';
import * as Chance from 'chance';

describe('test parser index', (): void => {
    const chance: Chance.Chance = new Chance('test-parser-index');
    it('create a parser', (): void => {
        const str: string = chance.string();
        const parser: Parser = new Parser(str);

        // tslint:disable-next-line
        expect(parser).to.be.not.null;
        expect(parser.input).to.be.equal(str);
    });

    describe('raw', (): void => {
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
    });
});
