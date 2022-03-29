import { load, save } from '../infrastructure/persistance.js';
import 'dotenv/config';


class Ledger {

    static collection = {};

    static load() {
        const data = load(process.env.DATA_FILE_EXPENSES);

        if(data) {
            this.collection = data;
            return true;
        }

        return false;
    }
//async
    static save() {
        const result = save(process.env.DATA_FILE_EXPENSES, JSON.stringify(this.collection));

        return result;
    }

    static ensure(chat_id, expense) {
        if (!this.collection[chat_id]) this.collection[chat_id] = [];
        const bag = this.collection[chat_id];
        bag.push(expense);
    }

    static getByChatId(chat_id) {
        const result = this.collection[chat_id];

        return result;
    }

    static ensureAndSave(chattoAdd, expenseToAdd) {
        Ledger.ensure(chattoAdd, expenseToAdd);
        return Ledger.save();
    }
}

export { Ledger };