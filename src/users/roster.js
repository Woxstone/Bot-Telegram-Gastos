import * as fs from 'fs';
import { logger } from '../../src/helpers/logger.js'; 

import 'dotenv/config';

class Roster {

    static collection = [];

    static exists(user_id) {
        let result = false;

        if (this.collection.find(user => user.id === user_id)) { result = true; };

        return result;
    }

    static create(user) {
        this.collection.push(user);
    }

    static load() {

        try {
            this.collection = JSON.parse(fs.readFileSync(process.env.DATA_FILE_USERS));
        } catch (err) {
            this.collection = [];
            logger.info('error.roster.load');
            return false;
        }

        return true;
    }

    static search(user_id) {
        if (Roster.exists(user_id)) {
            return this.collection.find(user => user.id === user_id);
        }
        const undefined_user = { first_name: undefined };

        return undefined_user;
    }
    
    static save() {
        try {
            fs.writeFileSync(process.env.DATA_FILE_USERS, JSON.stringify(this.collection));
            return true;
        } catch (err) {
            return false;
        }
    }

    static createAndSave(user) {
        Roster.create(user);
        return Roster.save();
    }
}


export { Roster };