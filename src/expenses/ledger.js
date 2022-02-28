import fs from 'fs';
import { logger } from '../../src/helpers/logger.js'; 
import 'dotenv/config';

class Ledger{
    
    static collection = {};
    // cambiar a Enusre Ledger
    static add(chat_id, expense){
        if(!this.collection[chat_id])this.collection[chat_id]=[];
        const bag = this.collection[chat_id];
        bag.push(expense);     
    }

    static save() {
        try {
            fs.writeFileSync(process.env.DATA_FILE_EXPENSES, JSON.stringify(this.collection));
            return true;
        }
        catch(err) {
            return false;
        }
    }
 
    static addAndSave(chattoAdd, expenseToAdd){
        Ledger.add(chattoAdd, expenseToAdd);
        return Ledger.save();
    }

    static load() {
        try {
            this.collection = JSON.parse(fs.readFileSync(process.env.DATA_FILE_EXPENSES));
        } catch (err) {
            this.collection = {};
            logger.info('error.ledger.load');
            return false;
        }
        return true;
    }

    static getByChatId(chat_id) {
        const result = this.collection[chat_id];

        return result;
    }
}

export {Ledger};