import { Actions } from '../src/actions.js';

const today = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
}).format(Date.now());


describe('Actions', () => {
    it('retrieves help', () => {

        expect(Actions.getHelp()).toBe(`Hola, estos son los comandos que puedes utilizar:
/nuevo_usuario para crearte un usuario en este chat,
/addgasto "cantidad" "concepto" "DD/MM/YYYY" introducira un gasto en la bolsa del chat linkeado a ti,
/gastos te devolvere los gastos de este chat,
/cuenta usa este comando para dividir los gastos del chat con aquellos que hayan participado.
Si tienes algun problema /help para saber los formatos de nuevo`);
    });

    it('identifies itself', () => {

        expect(Actions.getIntroduction()).toBe(`Soy un bot de gastos compartido`);
    });
// hacer un test con la devoluccion de error de AddExpense

    it('When aadExpense is call must call Expenses.add and return a answer for the user', () => {
        
        const default_user = {
            id: 34_512_345,
            first_name: 'Fernado',
            name: 'melacoge con la mano'
        };
        const default_chat_id = -13_853;
        const message = '25 euros en copas'

        const result = Actions.addExpense(default_chat_id, default_user, message)

        expect(result).toBe(`gasto registrado: El ${today}, ${default_user.first_name} metio un gasto de cantidad: 25, \"euros en copas\"`);
    });

    it('shoud had an option for create a new user and handle when exist', () => {
        const default_user = {
            id: 43241,
            first_name: 'user first name example',
            name: 'user name example'
        };
        
      
        const default_chat_id = -13_853;

        const message = '';
        const expectedResult = `usuario ya registrado: Hola ${default_user.first_name} tu usuario ya estaba creado en este chat.`;

        expect(Actions.newUser(default_chat_id, default_user, message)).toBe(expectedResult);
    });


    it('shoud had an option for create a new user and handle when not exist', () => {
        const default_user = {
            id: 43241,
            first_name: 'user first name example',
            name: 'user name example'
        };
      
        const default_chat_id = -13_853;

        const message = '';
        const expectedResult = `usuario registrado: Hola ${default_user.first_name} tu usuario ha sido creado.`;

        expect(Actions.newUser(default_chat_id, default_user, message)).toBe(expectedResult);
    });
   
    it('should return a message when newuser allready exist ', () => {
        const default_user = {
            id: 34_512_345,
            first_name: 'Fernado',
            name: 'Sr'
        };
        const default_chat_id = -13_853;

        const message = '';
        const expectedResult = `usuario ya registrado: Hola ${default_user.first_name} tu usuario ya estaba creado en este chat.`;

        expect(Actions.newUser(default_chat_id, default_user, message)).toBe(expectedResult);
    });

    it.only('should print all the expenses of the chat', () => {
        const default_user = {
            id: 3_422_345,
            first_name: 'Fernado',
            name: 'melacoge con la mano'
        };
        const default_chat_id = -24;

        const expectedResult = `El 2/14/2022, Fernado metio un gasto de cantidad: 23, "sardinas"
El 01/10/2021, Fernado metio un gasto de cantidad: 42, "naves espaciales"`;

        Actions.newUser(default_chat_id, default_user);
        Actions.addExpense(default_chat_id, default_user, '23 sardinas 2/14/2022');
        Actions.addExpense(default_chat_id, default_user, '42 naves espaciales 01/10/2021');
        const result = Actions.showExpenses(default_chat_id, '');

        expect(result).toBe(expectedResult);
    });

    it('when command cuenta is called should return the bill of the chat', () => {
        const default_user = {
            id: 1,
            first_name: 'Fernado',
            name: ''
        };
        const default_user1 = {
            id: 2,
            first_name: 'Mixa',
            name: ''
        };
        const default_user2 = {
            id: 3,
            first_name: 'Pablo',
            name: ''
        };
        const default_user3 = {
            id: 4,
            first_name: 'Nacho',
            name: ''
        };
        const default_chat_id = 89;
        const expectedResult = `la cuenta: Pablo le debe a Mixa 112.66666666666667E
Fernado le debe a Mixa 108.66666666666664E.`;

        Actions.newUser(default_chat_id, default_user);
        Actions.newUser(default_chat_id, default_user1);
        Actions.newUser(default_chat_id, default_user2);
        Actions.newUser(default_chat_id, default_user3);

        Actions.addExpense(default_chat_id, default_user, '12');
        Actions.addExpense(default_chat_id, default_user1, '342');
        Actions.addExpense(default_chat_id, default_user2, '8');
        
        const result = Actions.showBill(default_chat_id, default_user);

        expect(result).toBe(expectedResult);
    });


    xit('should load in the collections the json and log onto channel error if somethig goes wrong', () => {
        const expected = true;

        const result = Actions.load();

        expect(result).toBe(expected);

    });
});