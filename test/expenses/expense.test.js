import { Expense } from '../../src/expenses/expense.js';

describe('test of the constructor of Expense', () => {
     const exp = {
            money: 0,
            concept: '',
            date: 2, 
            user_id : 32
        };
  
    it('should be 4 properties money, concept, date and user id', () => {      
        const default_userid = 56_345;
        const defaultExp = new Expense(exp, default_userid);

        expect(defaultExp.money).toBeDefined();
        expect(defaultExp.concept).toBeDefined();
        expect(defaultExp.date).toBeDefined();
        expect(defaultExp.user_id).toBeDefined();
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
    const exp = {
        money: 3,
        concept: 'sardinas',
        date: 2,
        user_id: 545
    };
    it('description methods should return the description of the expense', () => {
        const expected = `message.article ${exp.date}, /ID:${exp.user_id} message.person message.quantity: ${exp.money}, ${exp.concept}`;
        const defaultExp = new Expense(exp);

        expect(defaultExp.description()).toEqual(expected);
    });

    it('description methods should return the description of the expense without concept too', () => {
      

        exp.concept ='';
        const expected = `message.article ${exp.date}, /ID:${exp.user_id} message.person message.quantity: ${exp.money}, expense.description_noConcept`;
        const defaultExp = new Expense(exp);

        expect(defaultExp.description()).toEqual(expected);
    });
    
    it('today must be in european way if local is es-ES', () => {
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
    it('today must be in english way if local is en-UK', () => {
        const defaultExp = {
            money: 22,
            concept: 'ocas',
            date: undefined
        };
        const default_userid = 16_518;
        process.env.LOCALE_DATE_FORMAT = 'en-UK'
        const expense = new Expense(defaultExp, default_userid);
        const expected = new Intl.DateTimeFormat('en-UK', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }).format(Date.now());

          expect(expense.date).toEqual(expected);
    });
});