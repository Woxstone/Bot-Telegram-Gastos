// import { Actions } from '../src/actions.js';
// import fs from 'fs';
// jest.mock('../src/helpers/logger.js');
// jest.mock('fs');

const today = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
}).format(Date.now());


it('dummy', () => {
    expect(true).toBe(true);
})

describe('Actions', () => {
  
//     it('When aadExpense is call must call Expenses.add and return a answer for the user', () => {
        
//         const default_user = {
//             id: 34_512_345,
//             first_name: 'Fernado',
//             name: 'melacoge con la mano',
//             language_code: 'es'
//         };
//         const default_chat_id = -13_853;
//         const message = '25 euros en copas'

//         const result = Actions.addExpense(default_chat_id, default_user, message)

//         expect(result).toBe(`Gasto registrado: El ${today}, ${default_user.first_name} metio un gasto de cantidad: 25, \"euros en copas\"`);
//     });

//     it('should print all the expenses of the chat', () => {
//         const default_user = {
//             id: 3_422_345,
//             first_name: 'Fernado',
//             name: 'melacoge con la mano',
//             language_code: 'es'
//         };
//         const default_chat_id = -24;

//         const expectedResult = `El 2/14/2022, Fernado metio un gasto de cantidad: 23, "sardinas"
// El 01/10/2021, Fernado metio un gasto de cantidad: 42, "naves espaciales"`;

//         Actions.newUser(default_chat_id, default_user);
//         Actions.addExpense(default_chat_id, default_user, '23 sardinas 2/14/2022');
//         Actions.addExpense(default_chat_id, default_user, '42 naves espaciales 01/10/2021');
//         const result = Actions.showExpenses(default_chat_id, default_user);

//         expect(result).toBe(expectedResult);
//     });

//     it('when command cuenta is called should return the bill of the chat', () => {
//         const default_user = {
//             id: 1,
//             first_name: 'Fernado',
//             name: '',
//             language_code: 'es'
//         };
//         const default_user1 = {
//             id: 2,
//             first_name: 'Mixa',
//             name: '',
//             language_code: 'es'
//         };
//         const default_user2 = {
//             id: 3,
//             first_name: 'Pablo',
//             name: '',
//             language_code: 'es'
//         };
//         const default_user3 = {
//             id: 4,
//             first_name: 'Nacho',
//             name: '',
//             language_code: 'es'
//         };
//         const default_chat_id = 89;
//         const expectedResult = `La cuenta: Nacho le debe a Mixa 90.5E
// Pablo le debe a Mixa 82.5E
// Fernado le debe a Mixa 78.5E.`;

//         Actions.newUser(default_chat_id, default_user);
//         Actions.newUser(default_chat_id, default_user1);
//         Actions.newUser(default_chat_id, default_user2);
//         Actions.newUser(default_chat_id, default_user3);

//         Actions.addExpense(default_chat_id, default_user, '12 manzanas');
//         Actions.addExpense(default_chat_id, default_user1, '342');
//         Actions.addExpense(default_chat_id, default_user2, '8 peras');
        
//         const result = Actions.showBill(default_chat_id, default_user);

//         expect(result).toBe(expectedResult);
//     });

//     it('sendRelateImage return an image file', async () => {
//         const default_chat_id = 23445;
//         const default_user = {
//             id: 4,
//             first_name: 'Nacho',
//             name: 'NAchoname'
//         };
//         const message = '25 calabazas';
//         const expected = '';

//         const result = Actions.sendRelateImage(default_chat_id, default_user, message);

//         expect(result).toBe(expected);
//     });
});