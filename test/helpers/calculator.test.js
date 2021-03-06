import { Calculator } from '../../src/helpers/calculator.js';

class Transaction {
    constructor(payer, money, receiver) {
        this.payer = payer;
        this.money = money;
        this.receiver = receiver;
    }
}

[
    { money: 1, concept: '', date: '2/21/2022', user_id: 1 },
    { money: 1, concept: '', date: '2/21/2022', user_id: 1 }
]

const expense1 = { money: 21, concept: 'barbacoa', date: new Date(), user_id: 32 };
const expense2 = { money: 51, concept: 'barbacoa', date: new Date(), user_id: 44 };
const expense3 = { money: 16, concept: 'barbacoa', date: new Date(), user_id: 32 };
const expense4 = { money: 23, concept: 'barbacoa', date: new Date(), user_id: 77 };
const expense5 = { money: 77, concept: 'barbacoa', date: new Date(), user_id: 77 };
const expense6 = { money: 12, concept: 'barbacoa', date: new Date(), user_id: 32 };
const expense7 = { money: 8, concept: 'barbacoa', date: new Date(), user_id: 44 };
const expense8 = { money: 38, concept: 'barbacoa', date: new Date(), user_id: 3 };
const expense9 = { money: 86, concept: 'barbacoa', date: new Date(), user_id: 3 };
const expense10 = { money: 81, concept: 'barbacoa', date: new Date(), user_id: 32 };
const expense11 = { money: 7, concept: 'barbacoa', date: new Date(), user_id: 32 };
const expense12 = { money: 15, concept: 'barbacoa', date: new Date(), user_id: 3 };
const expense13 = { money: 88, concept: 'barbacoa', date: new Date(), user_id: 32 };
const expense14 = { money: 54, concept: 'barbacoa', date: new Date(), user_id: 44 };
const expense15 = { money: 76, concept: 'barbacoa', date: new Date(), user_id: 88 };

const defaultCollection = [expense1, expense2, expense3, expense4, expense5, expense6, expense7, expense8,
    expense9, expense10, expense11, expense12, expense13, expense14, expense15];





describe("i want to ask for resolveExpenses  and return an array of transactions", () => {
    it("should return [] transactions on input [-14,25,7,75,-2,25,8,75]", () => {
        const expectedTransaction1 = new Transaction(0, 8.75, 3);
        const expectedTransaction2 = new Transaction(0, 5.5, 1);
        const expectedTransaction3 = new Transaction(2, 2.25, 1);
        const inputArray = [-14.25, 7.75, -2.25, 8.75];

        const expectedResult = [expectedTransaction1, expectedTransaction2, expectedTransaction3];

        const result = Calculator.resolveExpenses(inputArray);

        expect(result).toEqual(expectedResult);
    })


    it("should return an the sum of expenses of any user as totals={user_id : total ...} from a ledger.collection[chat_id] object", () => {
        const inputExpenses = defaultCollection;

        const expectedResult = [
            { user_id: 32, total: 225 },
            { user_id: 44, total: 113 },
            { user_id: 77, total: 100 },
            { user_id: 3, total: 139 },
            { user_id: 88, total: 76 }
        ];

        const result = Calculator.makeTotalsByUserId(inputExpenses);

        expect(result).toEqual(expectedResult);
    })

    it("should had the prepareDiff method for calculate the how much the user borrows", () => {
        const theUserTotalsObject = [
            { user_id: 32, total: 225 },
            { user_id: 44, total: 113 },
            { user_id: 77, total: 100 },
            { user_id: 3, total: 139 },
            { user_id: 88, total: 76 }
        ];
        const expectedResult = [94.4, -17.6, -30.6, 8.4, -54.6];
        expect(Calculator.prepareDiff(theUserTotalsObject)).toEqual(expectedResult);

    })

    it('should had a distribute method that receives an expenses array and returns a payments array', () => {
        const inputExpenses = defaultCollection;

        const expectedTransaction1 = new Transaction(88, 54.6, 32);
        const expectedTransaction2 = new Transaction(77, 30.6, 32);
        const expectedTransaction3 = new Transaction(44, 9.2, 32);
        const expectedTransaction4 = new Transaction(44, 8.4, 3);


        const expectedResult = [expectedTransaction1,
            expectedTransaction2,
            expectedTransaction3,
            expectedTransaction4];


        const result = Calculator.calculateBill(inputExpenses);

        expect(result).toEqual(expectedResult);
    });

    it('roundtoTwo works', () => {
        const result = Calculator.roundToTwo(2.299999999999999996);

        expect(result).toEqual(2.3);
    });


    it('if only one user_id is provided must retrun the total and his id', () => {
        const expense1 = { money: 21, concept: 'barbacoa', date: new Date(), user_id: 32 };
        const expense2 = { money: 51, concept: 'barbacoa', date: new Date(), user_id: 32 };
        const expense3 = { money: 16, concept: 'barbacoa', date: new Date(), user_id: 32 };
        const default_expenses = [expense1, expense2, expense3];
        const expected = [{"total": 88, "user_id": 32}];

        const result = Calculator.calculateBill(default_expenses);

        expect(result).toEqual(expected);
    });

})

