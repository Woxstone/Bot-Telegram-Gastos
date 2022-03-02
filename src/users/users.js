import { Roster } from './roster';
import { User } from './user';

class Users {

    static load() {
        return Roster.load();
    }

    static ensure(user) {
        const theUser = new User(user.id, user.first_name, user.username);
        let result = true;

        if (!Roster.exists(theUser.id)) {
            Roster.addAndSave(theUser);
            result = false;
        };

        return result;
    }

    static describe(theUser, exits = false) {
        if (exits) {
            return `user.hello ${theUser.first_name} user.exits_end`;
        };

        return `user.hello ${theUser.first_name} user.create_ok`;
    }

    static describeReceipt(receipt) {
        let result = '';
        receipt.forEach(debt => {
            const payer = Roster.search(debt.payer).first_name;
            const receiver = Roster.search(debt.receiver).first_name;

            result += `${payer} user.debt ${receiver} ${debt.money}E\n`;
        });

        result = result.replace(/\n$/g, '.');

        return result;
    }

    static parseId(expensesWithKeys) {
        const IDMARK = '/ID:'
        let result = expensesWithKeys.split(' ')
        result = result.map((word) => {
            ;
            if (word.includes(IDMARK)) {
                let id = word.replace(IDMARK, '').replace(/.$/gm, '');
                const username = Roster.search(Number.parseInt(id)).first_name;
                return username;
            }
            return word;
        })
        result = result.join(' ');
        return result;
    }
}

export { Users }