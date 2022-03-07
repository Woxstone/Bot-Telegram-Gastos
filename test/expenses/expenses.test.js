import { Expenses } from '../../src/expenses/expenses.js';

import { expenseDescriptionMock, theExpenseConstructor, Expense } from '../../src/expenses/expense.js';
import { Ledger } from '../../src/expenses/ledger.js';
jest.mock('../../src/expenses/expense.js');
jest.mock('../../src/expenses/ledger.js');

beforeEach(() => {
    Ledger.collection.mockClear();
    Ledger.ensure.mockClear();
    Ledger.save.mockClear();
    Ledger.ensureAndSave.mockClear();
    Ledger.load.mockClear();
    Ledger.getByChatId.mockClear();
    expenseDescriptionMock.mockClear();
    theExpenseConstructor.mockClear();
});

describe('Test about the methods', () => {
    it('should add expenses with chatid userid and expense to the ledger addding userid to the expense object', () => {
        Ledger.ensureAndSave.mockReturnValueOnce(true);
        expenseDescriptionMock.mockReturnValueOnce(`message.article 25/03/2022, 11 message.person message.quantity: 0 "sardinas"`);

        const default_chat_id = 222;
        
        const defaultExp = {
            money: 0,
            concept: 'sardinas',
            date: '25/03/2022',
            user_id : 545,
            description: expenseDescriptionMock
        };

        theExpenseConstructor.mockImplementationOnce(() => {
            return {
                money: defaultExp.money,
                concept: defaultExp.concept,
                date: defaultExp.date,
                user_id: defaultExp.user_id,
                description: expenseDescriptionMock
            }
        })
        const expected = `message.article 25/03/2022, 11 message.person message.quantity: 0 "sardinas"`
        let theExpense = defaultExp;
       

        let result = Expenses.add(default_chat_id, defaultExp.user_id, defaultExp);
        expect(Ledger.ensureAndSave).toHaveBeenCalledWith(default_chat_id, theExpense);
        expect(theExpenseConstructor).toHaveBeenCalled();
        expect(expenseDescriptionMock).toHaveBeenCalled();
        expect(result).toBe(expected);
    });

    it('should return a error if thers some problem in Ledger.addAndSave', () => {
        Ledger.ensureAndSave.mockReturnValueOnce(false);

        const default_chat_id = 222;
        
        const defaultExp = {
            money: 0,
            concept: 'sardinas',
            date: '25/03/2022',
            user_id : 545,
            description: expenseDescriptionMock
        };

        theExpenseConstructor.mockImplementationOnce(() => {
            return {
                money: defaultExp.money,
                concept: defaultExp.concept,
                date: defaultExp.date,
                user_id: defaultExp.user_id,
                description: expenseDescriptionMock
            }
        })

        const expected = 'expenses.error_save';
        let theExpense = defaultExp;
       

        let result = Expenses.add(default_chat_id, defaultExp.user_id, defaultExp);
        expect(Ledger.ensureAndSave).toHaveBeenCalledWith(default_chat_id, theExpense);
        expect(theExpenseConstructor).toHaveBeenCalled();
        expect(expenseDescriptionMock).not.toHaveBeenCalled();
        expect(result).toBe(expected);
    });

    it('should to know how to express an expense', () => {
        expenseDescriptionMock.mockReturnValueOnce(`message.article 25/03/2022, 11 message.person message.quantity: 0 "sardinas"`);

        const defaultExp = {
            money: 0,
            concept: 'sardinas',
            date: '25/03/2022',
            description: expenseDescriptionMock
        }
        const theExpense = defaultExp;

        const expected = `message.article ${defaultExp.date}, 11 message.person message.quantity: ${defaultExp.money} "${defaultExp.concept}"`;
        const result = Expenses.description([theExpense]);

        expect(result).toEqual(expected);
        expect(expenseDescriptionMock).toHaveBeenCalled();
    });

    it('should return all Expenses of the given chat', () => {
        const ExpenesDescriptionMock = jest.fn().mockImplementationOnce(() => {
            return `message.article 07/04/1997, 341_341 message.person message.quantity: 23 "naves"
message.article 28/10/1998, 1234 message.person message.quantity: 32 "manzanas"`
        });
        Expenses.description = ExpenesDescriptionMock;
        const defaultExp = {
            money: 23,
            concept: 'naves',
            date: '07/04/1997'
        };
        const defaultExp2 = {
            money: 32,
            concept: 'manzanas',
            date: '28/10/1998'
        };
        const default_user = {
            id: 341_341,
            first_name: 'Fernado A.',
            name: 'Fernando'
        };
        const default_user2 = {
            id: 1234,
            first_name: 'Nacho M.',
            name: ''
        };
        const default_chat_id = -3425;

        Ledger.getByChatId.mockReturnValueOnce([defaultExp,defaultExp2]);

        const expectedResult = `message.article 07/04/1997, 341_341 message.person message.quantity: 23 "naves"
message.article 28/10/1998, 1234 message.person message.quantity: 32 "manzanas"`;

        const spygetExpensesByChatId = jest.spyOn(Expenses, 'getExpensesByChatId');
        const spydescription = jest.spyOn(Expenses, 'description');

        const result = Expenses.show(default_chat_id);

        expect(result).toEqual(expectedResult);
        expect(spygetExpensesByChatId).toHaveBeenCalled();
        expect(Expenses.getExpensesByChatId).toHaveBeenCalledWith(default_chat_id);
        expect(spydescription).toHaveBeenCalled();
    });

    it('I want showExpensesArray retrun the array of expenses of the chat', () => {
        const defaultExp = {
            money: 23,
            concept: 'naves',
            date: '07/04/1997'
        };
        const defaultExp2 = {
            money: 32,
            concept: 'manzanas',
            date: '28/10/1998'
        };
        const default_chat_id = -954;
        const expected = [defaultExp,defaultExp2];

        Ledger.getByChatId.mockReturnValueOnce([defaultExp,defaultExp2]);

        const result = Expenses.getExpensesByChatId(default_chat_id);

        expect(result).toEqual(expected);
        expect(Ledger.getByChatId).toHaveBeenCalled();
    });

    it('load must return false if somethig go rong', () => {
        Ledger.load.mockReturnValueOnce(false);

        const result = Expenses.load();

        expect(result).toBeFalsy();
        expect(Ledger.load).toHaveBeenCalled();
    });

    it('show must filter the expenses with money = 0', () => {
        const default_chat_id = 24;
        const defaultExp = {
            money: 23,
            concept: 'naves',
            date: '07/04/1997',
            user_id: 13
        };
        const defaultExp2 = {
            money: 32,
            concept: 'manzanas',
            date: '28/10/1998',
            user_id: 13
        };
        const defaultExp3 = {
            money: 0,
            concept: 'manzanas',
            date: '28/10/1998',
            user_id: 345
        }
        const expected = `message.article 07/04/1997, message.quantity: 23 "naves"
message.article 28/10/1998, message.quantity: 32 "manzanas"`;

        const ExpenesDescriptionMock = jest.fn().mockImplementationOnce(() => {
            return `message.article 07/04/1997, message.quantity: 23 "naves"
message.article 28/10/1998, message.quantity: 32 "manzanas"`
        });
        Expenses.description = ExpenesDescriptionMock;
        Ledger.getByChatId.mockReturnValueOnce([defaultExp,defaultExp2,defaultExp3]);

        const result = Expenses.show(default_chat_id);

        expect(result).toBe(expected);
    });

    it.only('show return a error message when thers no expenses in the chat', () => {
        const default_chat_id = 24;
        const defaultExp = {
            money: 0,
            concept: '',
            date: 'today'
        };

        const expected = `expenses.error_noExpensesIntheChat`;

        Ledger.getByChatId.mockReturnValueOnce([]);

        const result = Expenses.show(default_chat_id);

        expect(result).toBe(expected);
    });

});
