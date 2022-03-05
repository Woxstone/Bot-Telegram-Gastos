import { load, save } from '../infrastructure/persistance.js';
import 'dotenv/config';


class Roster {

    static collection = [];

    static load() {
        const data = load(process.env.DATA_FILE_USERS);

        if(data) {
            this.collection = data;
            return true;
        }

        return false;
    }


    static save() {
        const result = save(process.env.DATA_FILE_USERS, JSON.stringify(this.collection));

        return result;
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