import { Messages } from '../../src/infrastructure/messages.js';

describe('messages test',() => {
    it('control of the return message',() => {
        const helpExpected = Messages.LITERALS['help'];
        const introExpected = Messages.LITERALS['intro'];
        const expenesExpected = Messages.LITERALS['expense.added'];

        expect(Messages.retrieve('help')).toEqual(helpExpected);
        expect(Messages.retrieve('intro')).toEqual(introExpected);
        expect(Messages.retrieve('expense.added')).toEqual(expenesExpected);
    });
});

describe('Test of the methods', () => {
    it('pares take a string in this string we have info and keys must traduce this keys in real test', () => {
        const intake ='user.hello Fernando user.create_ok';
        const expected = `Hola Fernando tu usuario ha sido creado.`

        const result = Messages.parse(intake);

        expect(result).toBe(expected);
    });

    it('2 pares take a string in this string we have info and keys must traduce this keys in real test', () => {
        const intake = `message.article 28/2/2022, message.quantity: 87, "cosas"
message.article 28/2/2022, message.quantity: 35, "manzanas"
message.article 28/2/2022, message.quantity: 76, "peras"
message.article 28/2/2022, message.quantity: 8, "manzanas"`;

        const expected = `El 28/2/2022, cantidad: 87, "cosas"
El 28/2/2022, cantidad: 35, "manzanas"
El 28/2/2022, cantidad: 76, "peras"
El 28/2/2022, cantidad: 8, "manzanas"`;

        const result = Messages.parse(intake);

        expect(result).toBe(expected);
    });
});