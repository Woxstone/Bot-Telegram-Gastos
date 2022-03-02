import { Messages } from './infrastructure/messages.js';
import { Parser } from './helpers/parser.js';
import { Calculator } from './helpers/calculator.js';
import { Expenses } from './expenses/expenses.js';
import { Users } from './users/users.js';


class Actions {

    static getHelp() {
        return Messages.retrieve('help');
    }

    static getIntroduction() {
        return Messages.retrieve('intro');
    }

    static load() {
        Users.load();
        Expenses.load();
    }

    static addExpense(chat_id, user_ctx, message) {

        const theExpense = {
            money: Parser.extractMoney(message),
            concept: Parser.extractConcept(message),
            date: Parser.extractDate(message)
        };

        Users.ensure(user_ctx);
        const expenseKeys = Expenses.add(chat_id, user_ctx.id, theExpense);
        let expense= Users.parseId(expenseKeys);

        expense = Messages.parse(expense);

        // if (expense === false) { return Messages.retrieve('err.ledger') };
        const answer = Messages.retrieve('expense.added');
        const result = `${answer}: ${expense}`;

        return result;
    }
// incluir un gatos  ficticio (0 0 ) para que la añanda en las cunetas entonces parse.extracConcepto poner sin concepto y que gasto filtre los gasto con money = 0
    static newUser(chat_id = '', user_ctx, message = '') {
        let result = '';
        let answer = '';
        let userMessage = '';
        const theUser = {
            id: Parser.extractId(user_ctx),
            first_name: Parser.extractFirstName(user_ctx),
            username: Parser.extractName(user_ctx)
        };

        if (Users.ensure(theUser)) {
            const keysMessages = Users.describe(theUser, true);
            userMessage = Messages.parse(keysMessages);
            answer = Messages.retrieve('user.exits');

        } else {
            const keysMessages = Users.describe(theUser);
            userMessage = Messages.parse(keysMessages);
            answer = Messages.retrieve('user.new_user');
            const ghostExpense = '0';
            Actions.addExpense(chat_id, user_ctx, ghostExpense);
        }

        result = `${answer}: ${userMessage}`;

        return result;
    }

    static showExpenses(chat_id, user_ctx = '', message = '') {
        const expensesWithKeys = Expenses.show(chat_id);

        let result= Users.parseId(expensesWithKeys);

        result = Messages.parse(result);


        return result;
    }

    static showBill(chat_id, user_ctx = '', message = '') {

        const expensesOfChat = Expenses.getExpensesByChatId(chat_id);
        const receipt = Calculator.calculateBill(expensesOfChat);     
        const billKeys = Users.describeReceipt(receipt);
        const bill = Messages.parse(billKeys);
        
        const answer = Messages.retrieve('bill');
        const result = `${answer}: ${bill}`;

        return result;
    }

}


export { Actions };