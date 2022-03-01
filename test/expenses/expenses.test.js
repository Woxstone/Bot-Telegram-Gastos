import { Expenses } from '../../src/expenses/expenses.js';

import { expenseDescriptionMock, theExpenseConstructor, Expense } from '../../src/expenses/expense.js';
import { Ledger } from '../../src/expenses/ledger.js';
jest.mock('../../src/expenses/expense.js');
jest.mock('../../src/expenses/ledger.js');

beforeEach(() => {
    Ledger.collection.mockClear();
    Ledger.add.mockClear();
    Ledger.save.mockClear();
    Ledger.addAndSave.mockClear();
    Ledger.load.mockClear();
    Ledger.getByChatId.mockClear();
    expenseDescriptionMock.mockClear();
    theExpenseConstructor.mockClear();
});

describe('Test about the methods', () => {
    xit('should add expenses with chatid userid and expense to the ledger addding userid to the expense object', () => {
        Ledger.addAndSave.mockReturnValueOnce(true);
        expenseDescriptionMock.mockReturnValueOnce(`message.article 25/03/2022, message.quantity: 0 "sardinas"`);

        const default_chat_id = 222;
        const default_user_id = 11;
        const defaultExp = {
            money: 0,
            concept: 'sardinas',
            date: '25/03/2022'
        };

        theExpenseConstructor.mockImplementationOnce(() => {
            return {
                money: defaultExp.money,
                concept: defaultExp.concept,
                date: defaultExp.date,
                id: default_user_id
            }
        })
        const expected = `message.article 25/03/2022, message.quantity: 0 "sardinas"`
        let theExpense = defaultExp;
        theExpense.id = default_user_id;

        let result = Expenses.add(default_chat_id, default_user_id, defaultExp);
        expect(Ledger.addAndSave).toHaveBeenCalledWith(default_chat_id, theExpense);
        expect(theExpenseConstructor).toHaveBeenCalled();
        expect(expenseDescriptionMock).toHaveBeenCalled();
        expect(result).toBe(expected);
    });

    it('should return a error if thers some problem in Ledger.addAndSave', () => {
        Ledger.addAndSave.mockReturnValueOnce(false);

        const default_chat_id = 222;
        const default_user_id = 11;
        const defaultExp = {
            money: 0,
            concept: 'sardinas',
            date: '25/03/2022'
        };

        theExpenseConstructor.mockImplementationOnce(() => {
            return {
                money: defaultExp.money,
                concept: defaultExp.concept,
                date: defaultExp.date,
                id: default_user_id
            };
        });

        const expected = 'expenses.error_save';
        let theExpense = defaultExp;
        theExpense.id = default_user_id;

        let result = Expenses.add(default_chat_id, default_user_id, defaultExp);
        expect(Ledger.addAndSave).toHaveBeenCalledWith(default_chat_id, theExpense);
        expect(theExpenseConstructor).toHaveBeenCalled();
        expect(expenseDescriptionMock).not.toHaveBeenCalled();
        expect(result).toBe(expected);
    });

    xit('should to know how to express an expense', () => {
        expenseDescriptionMock.mockReturnValueOnce(`message.article 25/03/2022, message.quantity: 0 "sardinas"`);

        const defaultExp = {
            money: 0,
            concept: 'sardinas',
            date: '25/03/2022'
        };
        const theExpense = defaultExp;

        const expected = `message.article ${defaultExp.date}, message.quantity: ${defaultExp.money} "${defaultExp.concept}"`;
        const result = Expenses.description([theExpense]);

        expect(result).toEqual(expected);
        expect(theExpenseConstructor).toHaveBeenCalled();
        expect(theExpenseConstructor).toHaveBeenCalledWith(theExpense);
        expect(expenseDescriptionMock).toHaveBeenCalled();
    });

    it('should return all Expenses of the given chat', () => {
        const ExpenesDescriptionMock = jest.fn().mockImplementationOnce(() => {
            return `message.article 07/04/1997, message.quantity: 23 "naves"
message.article 28/10/1998, message.quantity: 32 "manzanas"`
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
        const expectedResult = `message.article 07/04/1997, message.quantity: 23 "naves"
message.article 28/10/1998, message.quantity: 32 "manzanas"`;

        const spyshowExpensesArray = jest.spyOn(Expenses, 'showExpensesArray');
        const spydescription = jest.spyOn(Expenses, 'description');

        const result = Expenses.show(default_chat_id);

        expect(result).toEqual(expectedResult);
        expect(spyshowExpensesArray).toHaveBeenCalled();
        expect(Expenses.showExpensesArray).toHaveBeenCalledWith(default_chat_id);
        expect(spydescription).toHaveBeenCalled();
    });

    it('I want showExpensesArray retrun the array of expenses of the chat', () => {
        const exp1 = {
            id: 'one'
        };
        const exp2 = {
            id: 'two'
        };
        const default_chat_id = -954;
        const expected = [exp1,exp2];

        Ledger.getByChatId.mockReturnValueOnce([exp1,exp2]);

        const result = Expenses.showExpensesArray(default_chat_id);

        expect(result).toEqual(expected);
        expect(Ledger.getByChatId).toHaveBeenCalled();
    });

    it('load must return false if somethig go rong', () => {
        Ledger.load.mockReturnValueOnce(false);

        const result = Expenses.load();

        expect(result).toBeFalsy();
        expect(Ledger.load).toHaveBeenCalled();
    });
});