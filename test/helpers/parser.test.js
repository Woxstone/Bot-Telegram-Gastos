import { Parser } from '../../src/helpers/parser.js';

describe('Parser method testting', () => {
    it('should parse money from a formated string NN concept', () => {
        const expectedResult = 42;
        const intakeString = '42 manzanas';

        const result = Parser.extractMoney(intakeString);
        expect(result).toEqual(expectedResult);
    });

    it('should parse concept from a formated string NN concept', () => {
        const expectedResult = 'manzanas verdes';
        const intakeString = '42 manzanas verdes';

        const result = Parser.extractConcept(intakeString);
        expect(result).toEqual(expectedResult);
    });

    
   it('should parse concept from a formated string NN concept', () => {
        const expectedResult = 'manzanas verdes';
        const intakeString = '42 manzanas verdes 10/02/2022';

        const result = Parser.extractConcept(intakeString);
        expect(result).toEqual(expectedResult);
    });

    it('should parse date from a formated string NN concept', () => {
        const expectedResult = undefined;
        const intakeString = '42 manzanas verdes  ';

        const result = Parser.extractDate(intakeString);
        expect(result).toEqual(expectedResult);
    });

    it('should parse date from a formated string NN concept', () => {
        const expectedResult = '10/02/2022';
        const intakeString = '42 manzanas verdes 10/02/2022';

        const result = Parser.extractDate(intakeString);
        expect(result).toEqual(expectedResult);
    });

    const default_from = {
        id: 305,
        is_bot: false,
        first_name: 'Nacho',
        last_name: 'mi apellido',
        username: 'dfadfa',
        language_code: 'en'
    };

    it('should extrac the id of the user', () => {
        const expectedResult = 3605;

        const result = Parser.extractId(default_from);

        expect(result).toEqual(expectedResult);
    });

    it('should extrac the first_name of the user', () => {
        const expectedResult = 'Nacho';

        const result = Parser.extractFirstName(default_from);

        expect(result).toEqual(expectedResult);
    });

    it('should extrac de name of the user', () => {
        const expectedResult = 'gfsegsd';

        const result = Parser.extractName(default_from);

        expect(result).toEqual(expectedResult);
    });
})