import fs from 'fs';
import { logger } from '../../src/helpers/logger.js';
import 'dotenv/config';

class Ledger {

    static collection = {};

    static load() {
        try {
            this.collection = JSON.parse(fs.readFileSync(process.env.DATA_FILE_EXPENSES));
        } catch (err) {
            logger.info('error.ledger.load');
            return false;
        }
        return true;
    }

    static save() {
        try {
            fs.writeFileSync(process.env.DATA_FILE_EXPENSES, JSON.stringify(this.collection));
            return true;
        }
        catch (err) {  
            logger.error('error.ledger.save');
            return false;
        }
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