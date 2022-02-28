import { Expense } from '../../src/expenses/expense.js';

describe('test of the constructor of Expense', () => {
     const exp = {
            money: 0,
            concept: '',
            date: 2
        };
    it('should be 4 properties money, concept, date and user id', () => {      
        const default_userid = 56_345;
        const defaultExp = new Expense(exp, default_userid);

        expect(defaultExp.money).toBeDefined();
        expect(defaultExp.concept).toBeDefined();
        expect(defaultExp.date).toBeDefined();
        expect(defaultExp.id).toBeDefined();
    });

    it('if date is undefined must be "today"',() => {
        exp.date = undefined;
        const default_userid = 56_345;

        const defaultExp = new Expense(exp, default_userid);
        const expected = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }).format(Date.now());

        expect(defaultExp.date).toEqual(expected);
    });

    it('if id is not specified must be undefined', () => {
        const result = new Expense(exp);
        
        expect(result.id).toBeUndefined();
    });
});

describe('test about the methods', () => {
    it('description methods should return the description of the expense', () => {
        const exp = {
            money: 0,
            concept: 'sardinas',
            date: 2
        };
        const default_userid = 56_345;

        const expected = `message.article ${exp.date}, message.quantity: ${exp.money} "${exp.concept}"`;
        const defaultExp = new Expense(exp, default_userid);

        expect(defaultExp.description()).toEqual(expected);
    });
    
    it('today must be in european way ', () => {
        const defaultExp = {
            money: 22,
            concept: 'ocas',
            date: undefined
        };
        const default_userid = 16_518;
       
        const expense = new Expense(defaultExp, default_userid);
        const expected = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }).format(Date.now());

          expect(expense.date).toEqual(expected);
    });
});