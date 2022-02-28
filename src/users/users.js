import { Roster } from './roster';
import { User } from './user';

class Users {

    static ensure(user){
        const theUser = new User (user.id, user.first_name, user.username);
        if (!Roster.exists(theUser.id)) {
            Roster.createAndSave(theUser)
            return false
        };

        return true;
    }

    static describe(theUser, exits = false) { 
        if(exits) {
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

    static load() {
        return Roster.load();
    }
}

export {Users}