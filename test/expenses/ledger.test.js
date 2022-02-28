import { Ledger } from '../../src/expenses/ledger.js';
import  fs  from 'fs';
jest.mock('fs');


beforeEach(() => {
    flushLedger();
});

function flushLedger() {
    Ledger.collection = {};
};


describe('ledger works as a ledger ', () => {
    it('should create a chat if dont exist and add an expense', () => {
        const chat_id = 1234;
        const expenseToAdd = {};
        const initial_collection = JSON.stringify(Ledger.collection);

        Ledger.add(chat_id, expenseToAdd);

        expect(JSON.stringify(Ledger.collection)).not.toStrictEqual(initial_collection);
        expect(Ledger.collection[chat_id]).toStrictEqual([expenseToAdd]);
    });

    it('when add an expense to a chat must be add only to that chat expenses', () => {
        const chattoAdd = 34;
        const expenseToAdd = {};
        const anotherChat = 45;
        const anotherExpense = { another: 'different object' };

        Ledger.add(chattoAdd, expenseToAdd);
        Ledger.add(anotherChat, anotherExpense);

        expect(Ledger.collection[chattoAdd]).toStrictEqual([expenseToAdd]);
        expect(Ledger.collection[anotherChat]).not.toStrictEqual([expenseToAdd]);
    });

    it('persintace of ledger', () => {
        fs.writeFileSync.mockReturnValue(true);

        let result = false;

        result = Ledger.save();

        expect(result).toBeTruthy();
    });

    it('persintace of ledger fails if no writes', () => {
        fs.writeFileSync.mockImplementation(() => { throw new Error() });

        let result = true;

        result = Ledger.save();

        expect(result).toBeFalsy();
    });

    it('should be able to add and save in the same method', () => {
        const saveMock = jest.fn().mockReturnValueOnce(true);
        Ledger.save = saveMock;

        const chattoAdd = 78;
        const expenseToAdd = {};

        const saveSpy = jest.spyOn(Ledger, 'add');
        const addSpy = jest.spyOn(Ledger, 'save');

        const result = Ledger.addAndSave(chattoAdd, expenseToAdd);
        
        expect(saveSpy).toHaveBeenCalled();
        expect(addSpy).toHaveBeenCalled();
        expect(result).toBeTruthy();
    });

    it('load of ledger', () => {
        fs.readFileSync.mockReturnValue(Buffer.from(JSON.stringify({ fer_id: [{}] })));
        const expected = { fer_id: [{}] };

        Ledger.load();

        const result = Ledger.collection;
        expect(result).toStrictEqual(expected);
    });

    it('load of ledger return false when fs error on read', () => {
        fs.readFileSync.mockImplementation(() => {
            throw new Error();
        });

        const result = Ledger.load();

        expect(result).toBeFalsy();
    });

    it('When getByChatId is call must return an array of expenses', () => {
        const exp1 = {
            money: 23,
            concept: 'naves',
            date: '07/04/1997',
            id: 123
        };
        const exp2 = {
            money: 32,
            concept: 'manzanas',
            date: '28/10/1998',
            id: 341_342
        };

        const default_chat_id = -954;
        const expectedResult = [exp1, exp2];

        Ledger.add(default_chat_id, exp1);
        Ledger.add(default_chat_id, exp2);

        const result = Ledger.getByChatId(default_chat_id);
        expect(result).toEqual(expectedResult);
    });
});