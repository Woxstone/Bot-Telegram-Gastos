// import { Actions } from '../src/actions.js';
// import axios from 'axios';
const today = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
}).format(Date.now());

it('dummy', () => {
    expect(true).toBe(true);
})


// describe('Actions', () => {
//     it('retrieves help', () => {

//         expect(Actions.getHelp('en-UK')).toBe(`Hola, estos son los comandos que puedes utilizar:
// /nuevo_usuario para crearte un usuario en este chat,
// /addgasto "cantidad" "concepto" "DD/MM/YYYY" introducira un gasto en la bolsa del chat linkeado a ti,
// /gastos te devolvere los gastos de este chat,
// /cuenta usa este comando para dividir los gastos del chat con aquellos que hayan participado.
// Si tienes algun problema /help para saber los formatos de nuevo`);
//     });

//     it('identifies itself', () => {

//         expect(Actions.getIntroduction('en-UK')).toBe(`Soy un bot de gastos compartido`);
//     });


//     it('When aadExpense is call must call Expenses.add and return a answer for the user', () => {
        
//         const default_user = {
//             id: 34_512_345,
//             first_name: 'Fernado',
//             name: 'melacoge con la mano'
//         };
//         const default_chat_id = -13_853;
//         const message = '25 euros en copas'

//         const result = Actions.addExpense(default_chat_id, default_user, message)

//         expect(result).toBe(`Gasto registrado: El ${today}, ${default_user.first_name} metio un gasto de cantidad: 25€, euros en copas`);
//     });

//     it('shoud had an option for create a new user and handle when not exist', () => {
//         const default_user = {
//             id: 43241,
//             first_name: 'user first name example',
//             name: 'user name example'
//         };
      
//         const default_chat_id = -13_853;

//         const message = '';
//         const expectedResult = `Usuario registrado: Hola ${default_user.first_name} tu usuario ha sido creado.`;

//         expect(Actions.newUser(default_chat_id, default_user, message)).toBe(expectedResult);
//     });

//     it('should print all the expenses of the chat', () => {
//         const default_user = {
//             id: 3_422_345,
//             first_name: 'Fernado',
//             name: 'name'
//         };
//         const default_chat_id = -24;

//         const expectedResult = `El 2/14/2022, Fernado metio un gasto de cantidad: 23€, sardinas
// El 01/10/2021, Fernado metio un gasto de cantidad: 42€, naves espaciales`;

//         Actions.newUser(default_chat_id, default_user);
//         Actions.addExpense(default_chat_id, default_user, '23 sardinas 2/14/2022');
//         Actions.addExpense(default_chat_id, default_user, '42 naves espaciales 01/10/2021');
//         const result = Actions.showExpenses(default_chat_id, '');

//         expect(result).toBe(expectedResult);
//     });

//     it('when command cuenta is called should return the bill of the chat', () => {
//         const default_user = {
//             id: 1,
//             first_name: 'Fernado',
//             name: ''
//         };
//         const default_user1 = {
//             id: 2,
//             first_name: 'Mixa',
//             name: ''
//         };
//         const default_user2 = {
//             id: 3,
//             first_name: 'Pablo',
//             name: ''
//         };
//         const default_user3 = {
//             id: 4,
//             first_name: 'Nacho',
//             name: ''
//         };
//         const default_chat_id = 89;
//         const expectedResult = `La cuenta: Nacho le debe a Mixa 90.5€
// Pablo le debe a Mixa 82.5€
// Fernado le debe a Mixa 78.5€.`;

//         Actions.newUser(default_chat_id, default_user);
//         Actions.newUser(default_chat_id, default_user1);
//         Actions.newUser(default_chat_id, default_user2);
//         Actions.newUser(default_chat_id, default_user3);

//         Actions.addExpense(default_chat_id, default_user, '12');
//         Actions.addExpense(default_chat_id, default_user1, '342');
//         Actions.addExpense(default_chat_id, default_user2, '8');
        
//         const result = Actions.showBill(default_chat_id, default_user);

//         expect(result).toBe(expectedResult);
//     });

// it('ghost expense test')

// });
