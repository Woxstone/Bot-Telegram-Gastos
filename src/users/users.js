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

    static describe(theUser, exists = false) {
        if (exists) {
            return `user.hello ${theUser.first_name} user.exits_end`;
        };

        return `user.hello ${theUser.first_name} user.create_ok`;
    }

    static get(message) {
        const id = Users.getId(message);
        const user = Roster.search(id);
        const result = message.replace(id, user.first_name);

        return result;
    }

    static getId(message) {
        let result = message.match(/ \d+ /gm);
        result = parseFloat(result[0]);

        return result;
    }

    static describeReceipt(receipt) {
        let stringOfTransactions = '';

        receipt.forEach(debt => {
            const payer = Roster.search(debt.payer).first_name;
            const receiver = Roster.search(debt.receiver).first_name;

            stringOfTransactions += `${payer} user.debt ${receiver} ${debt.money}E\n`;
        });

        const billWithKeys = stringOfTransactions.replace(/\n$/g, '.');

        return billWithKeys;
    }

    static parseId(descriptionOfExpeneses) {
        const IDMARK = '/ID:'
        const expensesWithIDMARK = descriptionOfExpeneses.split(' ');
        const expensesOutIDMARK = expensesWithIDMARK.map((word) => {
            if (word.includes(IDMARK)) {
                const user_id = word.replace(IDMARK, '');
                const user = Roster.search(Number.parseInt(user_id));
                const username = user.first_name;
                return username;
            }
            return word;
        });

        const expensesClean = expensesOutIDMARK.join(' ');
        return expensesClean;
    }
}

export { Users }