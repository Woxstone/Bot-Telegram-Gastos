import { Parser } from '../../src/helpers/parser.js';

describe('Parser method testting of ctx.from', () => {

    const default_from = {
        id: 305,
        is_bot: false,
        first_name: 'Nacho',
        last_name: 'mi apellido',
        username: 'dfadfa',
        language_code: 'en'
    };

    it('should extrac the id of the user', () => {
        const expectedResult = 305;

        const result = Parser.extractId(default_from);

        expect(result).toEqual(expectedResult);
    });

    it('should extrac the first_name of the user', () => {
        const expectedResult = 'Nacho';

        const result = Parser.extractFirstName(default_from);

        expect(result).toEqual(expectedResult);
    });

    it('should extrac de name of the user', () => {
        const expectedResult = 'dfadfa';

        const result = Parser.extractName(default_from);

        expect(result).toEqual(expectedResult);
    });
});

describe('extractMoney', () => {
    it('should parse money from a formated string NN concept', () => {
        const expectedResult = 42;
        const intakeString = '42 manzanas';

        const result = Parser.extractMoney(intakeString);
        expect(result).toEqual(expectedResult);
    });
});

describe('extractConcept', () => {
    it('should parse concept from a formated string NN concept', () => {
        const expectedResult = 'manzanas verdes';
        const intakeString = '42 manzanas verdes 10/02/2022';

        const result = Parser.extractConcept(intakeString);
        expect(result).toEqual(expectedResult);
    });

    it('should parse concept from a formated string NN concept', () => {
        const expectedResult = 'manzanas verdes';
        const intakeString = '42 manzanas verdes';

        const result = Parser.extractConcept(intakeString);
        expect(result).toEqual(expectedResult);
    });
});

describe('extractDate', () => {
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
});

describe('Combinaciones', () => {
    it('123 concepto = { money: 123, concept: "concepto", date: undefined } ', () => {
        const intake = '123 concepto';
        expect(Parser.extractMoney(intake)).toBe(123);
        expect(Parser.extractConcept(intake)).toBe("concepto");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

    it('23  tetera = { cantidad: 23, concepto: "tetera",  date: undefined }', () => {
        const intake = '23  tetera';
        expect(Parser.extractMoney(intake)).toBe(23);
        expect(Parser.extractConcept(intake)).toBe("tetera");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

    it('234€ patata = { cantidad: 234, concepto: "234€ patata", date: undefined}', () => {
        const intake = '234€ patata';
        expect(Parser.extractMoney(intake)).toBe(234);
        expect(Parser.extractConcept(intake)).toBe("patata");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

    it('patatas 123€ = { cantidad: 123, concepto: "patatas 123€", date: undefined}', () => {
        const intake = 'patatas 123€';
        expect(Parser.extractMoney(intake)).toBe(123);
        expect(Parser.extractConcept(intake)).toBe("patatas");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });

    it('123€ = { cantidad: 123, concepto: "", date: undefined}', () => {
        const intake = '123€';
        expect(Parser.extractMoney(intake)).toBe(123);
        expect(Parser.extractConcept(intake)).toBe("");
        expect(Parser.extractDate(intake)).toBe(undefined);
    });
});