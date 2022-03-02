import {Expense} from './expense';
import {Ledger} from './ledger';

class Expenses{

    static add(chat_id, user_id, expense) {
        expense.user_id=user_id;
        const theExpense = new Expense(expense);           
        if(!Ledger.addAndSave(chat_id, theExpense)) {
            return 'expenses.error_save';
        };
        return Expenses.description([theExpense]);
    }

    static show(chat_id) {
        const theExpenses = this.showExpensesArray(chat_id);
        const result = Expenses.description(theExpenses);

        return result;
    }
// nuevo nombre getExpensesByChatId
   static showExpensesArray(chat_id) {
        const result = Ledger.getByChatId(chat_id);
        return result;
    }

    static description(expensesArray) {
        let result = '';
        let theExpense = undefined;
        expensesArray.forEach(expense => {
             theExpense = new Expense({money:0,concept:''});
             theExpense= Object.assign(theExpense ,expense);
            //              
            // theExpense = new Expense(expense);           
            result += `${theExpense.description()}\n`;
        });

        result = result.replace(/\n$/g, '');
        
        return result;
    }

    static load() {
        return Ledger.load();
    }
}

export {Expenses};