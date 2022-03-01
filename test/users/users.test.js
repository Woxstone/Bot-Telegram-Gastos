import { Users } from '../../src/users/users.js';
import { User , theUserConstructor} from '../../src/users/user.js';
import { Roster } from '../../src/users/roster.js';

jest.mock('../../src/users/user.js');
jest.mock('../../src/users/roster.js');

describe('Testing the methods of users', () => {
    let default_user = {
        id: 323441,
        first_name: 'Fernado A.',
        name: 'Fernando'
    };

    it('describe methods should describe properly', () => {
        const expected = `user.hello ${default_user.first_name} user.create_ok`;
        const result = Users.describe(default_user);

        expect(result).toEqual(expected);
    });

    it('if exits is true (exits in roster)', () => {
        const expected = `user.hello ${default_user.first_name} user.exits_end`;
        const result = Users.describe(default_user, true);

        expect(result).toEqual(expected);
    });

    it('describe Receipt must know how to describe a receipt', () => {
      
        const default_user = {
            id: 4256,
            first_name: 'Macho',
            username: 'Hijo de mano'
        };
      
        const default_user2 = {
            id: 2548,
            first_name: 'hector',
            username: 'lolailo'
        };
        const default_user3 = {
            id: 68781,
            first_name: 'fer',
            username: 'my surname'
        };
        
        // Roster.collection=[default_user,default_user2];
        Roster.search.mockReturnValueOnce(default_user)
        .mockReturnValueOnce(default_user3)
        .mockReturnValueOnce(default_user2)
        .mockReturnValueOnce(default_user)
        .mockReturnValueOnce(default_user2)
        .mockReturnValueOnce(default_user3)
        ;

        const default_expenses = [{ payer: 4256, money: 35, receiver: 68781 },
        { payer: 2548, money: 2, receiver: 4256 },
        { payer: 2548, money: 4, receiver: 68781 }];

        const result = Users.describeReceipt(default_expenses);

        const expected = `Macho user.debt fer 35E
hector user.debt Macho 2E
hector user.debt fer 4E.`;

        expect(result).toEqual(expected);
    });

    it('If the user exits must return true', () => {
        Roster.exists.mockReturnValueOnce(true);
      
        const result = Users.ensure(default_user);

        expect(result).toBeTruthy();
    });

    it('If the user dont exits ensure returns false', () => {
        Roster.exists.mockReturnValueOnce(false);
        const result = Users.ensure(default_user);

        expect(result).toBeFalsy();
    });

    it('load must return true if works properly', () => {
        Roster.load.mockReturnValueOnce(true);
        const result = Users.load();

        expect(result).toBeTruthy();
    });
    it('load must return false if somethig go wrong', () => {
        Roster.load.mockReturnValueOnce(false);
        const result = Users.load();

        expect(result).toBeFalsy();
    });

    it('getId must return id in the message', () => {
        const intake = `message.article 14/02/2021, /ID:87/ message.person message.quantity: 87, "perras"`;
        const expected = `message.article 14/02/2021, Yo message.person message.quantity: 87, "perras"`;

        Roster.search.mockReturnValueOnce({first_name: 'Yo'})

        const result = Users.parseId(intake);

        expect(result).toBe(expected);
    });
});