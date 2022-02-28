import { Actions } from '../src/actions.js';

import { Messages } from '../src/infrastructure/messages.js';
jest.mock('../src/infrastructure/messages.js')
import { Parser } from '../src/helpers/parser.js';
jest.mock('../src/helpers/parser.js')
import { Calculator } from '../src/helpers/calculator.js';
jest.mock('../src/helpers/calculator.js')
import { Expenses } from '../src/expenses/expenses.js';
jest.mock('../src/expenses/expenses.js')

import { Users } from '../src/users/users.js';
jest.mock('../src/users/users.js')


const today = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
}).format(Date.now());


//spyOn y luego en el expected pongo haveBeenCall
// const mockUsersEnsure = jest.fn().mockReturnValueOnce(true);
// Users.ensure = mockUsersEnsure;
// const mockUsersDescribe = jest.fn().mockReturnValueOnce(`user.hello Fernado user.create_ok`);
// Users.describe = mockUsersDescribe;
// const mockUsersdescribeReceipt = jest.fn().mockReturnValueOnce(`Pablo le debe a Mixa 112.66666666666667E
// Fernado le debe a Mixa 108.66666666666664E.`);
// Users.describeReceipt = mockUsersdescribeReceipt;

// const mockExpensesAdd = jest.fn().mockReturnValueOnce(`message.article ${today}, message.quantity: 25 "euros en copas"`);
// Expenses.add = mockExpensesAdd;
// const mockExpenesesshow = jest.fn().mockReturnValueOnce(`El 2/14/2022, cantidad: 23 "sardinas"
// El 01/10/2021, cantidad: 42 "naves espaciales"`);
// Expenses.show = mockExpenesesshow;
// const mockExpenesesshowExpensesArray = jest.fn().mockReturnValueOnce([{"money":12,"concept":"","date":today,"id":1},
// {"money":342,"concept":"","date":today,"id":2},
// {"money":8,"concept":"","date":today,"id":3}]);
// Expenses.showExpensesArray = mockExpenesesshowExpensesArray;


describe('Actions', () => {
    it('retrieves help', () => {
        Messages.retrieve.mockImplementationOnce((key)=>{return key});

        expect(Actions.getHelp()).toBe(`help`);
        expect(Messages.retrieve).toHaveBeenCalledWith('help');
    });

    it('identifies itself', () => {
        Messages.retrieve.mockImplementationOnce((key)=>{return key});

        expect(Actions.getIntroduction()).toBe(`intro`);
        expect(Messages.retrieve).toHaveBeenCalledWith('intro');

    });

    it('When aadExpense is call must call Expenses.add and return a answer for the user', () => {
        Messages.retrieve.mockImplementationOnce((key)=>{return key});
        Messages.parse.mockReturnValueOnce(`El ${today}, cantidad: 25 \"euros en copas\"`);
        Parser.extractMoney.mockReturnValueOnce(25);
        Parser.extractConcept.mockReturnValueOnce('euros en copas');
        Parser.extractDate.mockReturnValueOnce(today);

        const default_user = {
            id: 34_512_345,
            first_name: 'Fernado',
            name: 'melacoge con la mano'
        };
        const default_chat_id = -13_853;
        const message = '25 euros en copas'

        const result = Actions.addExpense(default_chat_id, default_user, message)

        expect(result).toBe(`expense.added: El ${today}, cantidad: 25 \"euros en copas\"`);
        expect(Expenses.add).toHaveBeenCalledWith(default_chat_id, default_user.id, { money: 25, concept: 'euros en copas', date: today });
    });

    it('shoud had an option for create a new user and handle when exist', () => {
        const default_user = {
            id: 43241,
            first_name: 'user first name example',
            name: 'user name example'
        };
        
        
        Parser.extractId.mockReturnValueOnce(default_user.id);
        Parser.extractFirstName.mockReturnValueOnce(default_user.first_name);
        Parser.extractName.mockReturnValueOnce(default_user.name);
      
        Users.ensure.mockReturnValueOnce(true);
       
        Messages.retrieve.mockImplementationOnce((key)=>{return key});
        Messages.parse.mockReturnValueOnce(`Hola ${default_user.first_name} tu usuario ya estaba creado en este chat.`);

      
        const default_chat_id = -13_853;

        const message = '';
        const expectedResult = `user.exits: Hola ${default_user.first_name} tu usuario ya estaba creado en este chat.`;

        expect(Actions.newUser(default_chat_id, default_user, message)).toBe(expectedResult);
    });


    it('shoud had an option for create a new user and handle when not exist', () => {
        const default_user = {
            id: 43241,
            first_name: 'user first name example',
            name: 'user name example'
        };
        
        
        Parser.extractId.mockReturnValueOnce(default_user.id);
        Parser.extractFirstName.mockReturnValueOnce(default_user.first_name);
        Parser.extractName.mockReturnValueOnce(default_user.name);
      
        Users.ensure.mockReturnValueOnce(false);
       
        Messages.retrieve.mockImplementationOnce((key)=>{return key});
        Messages.parse.mockReturnValueOnce(`Hola ${default_user.first_name} tu usuario ya estaba creado en este chat.`);

      
        const default_chat_id = -13_853;

        const message = '';
        const expectedResult = `user.new_user: Hola ${default_user.first_name} tu usuario ya estaba creado en este chat.`;

        expect(Actions.newUser(default_chat_id, default_user, message)).toBe(expectedResult);
    });
   
    xit('should return a message when newuser allready exist ', () => {
        mockUsersEnsure.mockReturnValueOnce(true);
        mockUsersDescribe.mockReturnValueOnce(`user.hello Fernado user.exits_end`);

        const default_user = {
            id: 34_512_345,
            first_name: 'Fernado',
            name: 'melacoge con la mano'
        };
        const default_chat_id = -13_853;

        const message = '';
        const expectedResult = `usuario ya registrado: Hola ${default_user.first_name} tu usuario ya estaba creado en este chat.`;

        expect(Actions.newUser(default_chat_id, default_user, message)).toBe(expectedResult);
    });

    xit('should print all the expenses of the chat', () => {
        //mock Expenses.show
        const mockActionsnewUser = jest.fn()
            .mockReturnValueOnce(`usuario registrado: Hola Fernando tu usuario ha sido creado.`);
        Actions.newUser = mockActionsnewUser;

        const mockActionaddExpenese = jest.fn()
            .mockReturnValueOnce(`gasto registrado: El 2/14/2022, cantidad: 23 "sardinas"`)
            .mockReturnValueOnce(`gasto registrado: El 01/10/2021, cantidad: 42 "naves espaciales"`);
        Actions.addExpense = mockActionaddExpenese;

        const default_user = {
            id: 3_422_345,
            first_name: 'Fernado',
            name: 'melacoge con la mano'
        };
        const default_chat_id = -24;

        const expectedResult = `El 2/14/2022, cantidad: 23 "sardinas"
El 01/10/2021, cantidad: 42 "naves espaciales"`;

        Actions.newUser(default_chat_id, default_user);
        Actions.addExpense(default_chat_id, default_user, '23 sardinas 2/14/2022');
        Actions.addExpense(default_chat_id, default_user, '42 naves espaciales 01/10/2021');
        const result = Actions.showExpenses(default_chat_id, '');

        expect(result).toBe(expectedResult);
    });

    xit('when command cuenta is called should return the bill of the chat', () => {
        const mockActionsnewUser = jest.fn()
            .mockReturnValueOnce(`usuario registrado: Hola Fernando tu usuario ha sido creado.`)
            .mockReturnValueOnce(`usuario registrado: Hola Mixa tu usuario ha sido creado.`)
            .mockReturnValueOnce(`usuario registrado: Hola Pablo tu usuario ha sido creado.`)
            .mockReturnValueOnce(`usuario registrado: Hola Nacho tu usuario ha sido creado.`);
        Actions.newUser = mockActionsnewUser;

        const mockActionaddExpenese = jest.fn()
            .mockReturnValueOnce(`gasto registrado: El ${today}, cantidad: 12 ""`)
            .mockReturnValueOnce(`gasto registrado: El ${today}, cantidad: 342 ""`)
            .mockReturnValueOnce(`gasto registrado: El ${today}, cantidad: 8 ""`);
        Actions.addExpense = mockActionaddExpenese;

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
        const expected = false;

        const result = Actions.load();

        expect(result).toBe(expected);

    });
});