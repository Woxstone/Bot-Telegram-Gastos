import { Messages } from '../../src/infrastructure/messages.js';

describe('messages test',() => {
    it('control of the return message',() => {
        const leg = 'es';

        const helpExpected = Messages.LITERALS[leg]['help'];
        const introExpected = Messages.LITERALS[leg]['intro'];
        const expenesExpected = Messages.LITERALS[leg]['expense.added'];

        expect(Messages.retrieve(leg, 'help')).toEqual(helpExpected);
        expect(Messages.retrieve(leg, 'intro')).toEqual(introExpected);
        expect(Messages.retrieve(leg, 'expense.added')).toEqual(expenesExpected);
    });
});

describe('Test of the methods', () => {
    it('pares take a string in this string we have info and keys must traduce this keys in real test', () => {
        const leg = 'es';

        const intake ='user.hello Fernando user.create_ok';
        const expected = `Hola Fernando tu usuario ha sido creado.`

        const result = Messages.parse(leg, intake);

        expect(result).toBe(expected);
    });

    it('2 pares take a string in this string we have info and keys must traduce this keys in real test', () => {
        const leg = 'es';
        const intake = `message.article 28/2/2022, message.quantity: 87, "cosas"
message.article 28/2/2022, message.quantity: 35, "manzanas"
message.article 28/2/2022, message.quantity: 76, "peras"
message.article 28/2/2022, message.quantity: 8, "manzanas"`;

        const expected = `El 28/2/2022, cantidad: 87, "cosas"
El 28/2/2022, cantidad: 35, "manzanas"
El 28/2/2022, cantidad: 76, "peras"
El 28/2/2022, cantidad: 8, "manzanas"`;

        const result = Messages.parse(leg, intake);

        expect(result).toBe(expected);
    });

    it('object with two keys one for Spanish another for Englesh', () => {
        const leg = 'en';
        const key = 'intro';

        const expected = 'Im a bot of shared expenses with to much lucky';

        const result = Messages.retrieve(leg, key);

        expect(result).toBe(expected);
    });

    it('object with two keys one for Spanish another for Englesh', () => {
        const leg = undefined;
        const key = 'intro';

        const expected = 'Soy un bot de gastos compartido';

        const result = Messages.retrieve(leg, key);

        expect(result).toBe(expected);
    });
});