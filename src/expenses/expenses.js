import { Expense } from './expense';
import { Ledger } from './ledger';

class Expenses {

    static load() {
        return Ledger.load();
    }

    static add(chat_id, user_id, expense) {
        expense.user_id = user_id;
        const theExpense = new Expense(expense);
        if (!Ledger.ensureAndSave(chat_id, theExpense)) {
            return 'expenses.error_save';
        };
        return Expenses.description([theExpense]);
    }

    static show(chat_id) {
        const theExpenses = this.getExpensesByChatId(chat_id);
        const filterExpenses = theExpenses.filter(expense => expense.money > 0);
        const result = Expenses.description(filterExpenses);

        return result;
    }
   
    static getExpensesByChatId(chat_id) {
        const expenses = Ledger.getByChatId(chat_id);
        return expenses;
    }


    static description(expensesArray) {
        let result = '';
        let theExpense = undefined;

        expensesArray.forEach(expense => {          
            theExpense = new Expense(expense);           
            result += `${theExpense.description()}\n`;
        });
        const lastLineBreack = new RegExp(/\n$/g); 
        result = result.replace(lastLineBreack, '');

        return result;
    }


}

export { Expenses };