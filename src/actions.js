import { Messages } from './infrastructure/messages.js';
import { Parser } from './helpers/parser.js';
import { Calculator } from './helpers/calculator.js';
import { Expenses } from './expenses/expenses.js';
import { Users } from './users/users.js';


class Actions {

    static getHelp(user_ctx) {
        return Messages.retrieve(user_ctx.language_code, 'help');
    }

    static getIntroduction(user_ctx) {
        return Messages.retrieve(user_ctx.language_code, 'intro');
    }

    static load() {
        Users.load();
        Expenses.load();
    }

    static newUser(chat_id = '', user_ctx, message = '') {
        let answer = '';
        let userMessage = '';

        const theUser = {
            id: Parser.extractId(user_ctx),
            first_name: Parser.extractFirstName(user_ctx),
            username: Parser.extractName(user_ctx)
        };

        if (Users.ensure(theUser)) {
            const keysUserMessage = Users.describe(theUser);
            userMessage = Messages.parse(user_ctx.language_code, keysUserMessage);
            answer = Messages.retrieve(user_ctx.language_code, 'user.exits');

        } else {
            const keysUserMessage = Users.describe(theUser);
            userMessage = Messages.parse(user_ctx.language_code, keysUserMessage);
            answer = Messages.retrieve(user_ctx.language_code, 'user.new_user');

            const ghostExpense = '0';
            Actions.addExpense(chat_id, user_ctx, ghostExpense);
        }

        const result = `${answer}: ${userMessage}`;

        return result;
    }

    static addExpense(chat_id, user_ctx, message) {

        const theExpense = {
            money: Parser.extractMoney(message),
            concept: Parser.extractConcept(message),
            date: Parser.extractDate(message)
        };

        Users.ensure(user_ctx);
        const expenseKeys = Expenses.add(chat_id, user_ctx.id, theExpense);
        const expense = parseId(user_ctx.language_code, expenseKeys);

        const answer = Messages.retrieve(user_ctx.language_code, 'expense.added');
        const result = `${answer}: ${expense}`;

        return result;
    }

    static showExpenses(chat_id, user_ctx = '', message = '') {
        const expensesWithKeys = Expenses.show(chat_id);
        const expenses = parseId(user_ctx.language_code, expensesWithKeys);

        return expenses;
    }

    static showBill(chat_id, user_ctx = '', message = '') {

        const expensesOfChat = Expenses.getExpensesByChatId(chat_id);
        const receipt = Calculator.calculateBill(expensesOfChat);
        const billKeys = Users.describeReceipt(receipt);
        const bill = Messages.parse(user_ctx.language_code, billKeys);

        const answer = Messages.retrieve(user_ctx.language_code, 'bill');
        const result = `${answer}: ${bill}`;

        return result;
    }

}

function parseId(user_language_code, expensesWithKeys) {
    const messageWithId = expensesWithKeys;
    const messageWithNameAndKeys = Users.parseId(messageWithId);
    const message = Messages.parse(user_language_code, messageWithNameAndKeys);

    return message;
}

export { Actions };