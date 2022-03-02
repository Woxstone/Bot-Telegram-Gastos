import * as fs from 'fs';
import { logger } from '../../src/helpers/logger.js';

import 'dotenv/config';

class Roster {

    static collection = [];

    static load() {

        try {
            this.collection = JSON.parse(fs.readFileSync(process.env.DATA_FILE_USERS));
        } catch (err) {
            logger.info('error.roster.load');
            return false;
        }
        return true;
    }

    static save() {
        try {
            fs.writeFileSync(process.env.DATA_FILE_USERS, JSON.stringify(this.collection));
            return true;
        } catch (err) {
            logger.error('error.ledger.save');
            return false;
        }
    }

    static add(user) {
        this.collection.push(user);
    }

    static find(user_id) {
        const userFind = this.collection.find(user => user.id === user_id);
        return userFind;
    }

    static exists(user_id) {
        let result = false;

        if (Roster.find(user_id)) { result = true; };

        return result;
    }

    static search(user_id) {
        let user = {};
        
        if (Roster.exists(user_id)) {
            user = Roster.find(user_id);
        } else {
            user = { first_name: undefined };
        }

        return user;
    }

    static addAndSave(user) {
        Roster.add(user);
        return Roster.save();
    }
}


export { Roster };