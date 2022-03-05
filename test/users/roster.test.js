import { Roster } from '../../src/users/roster.js';
import { load, save } from '../../src/infrastructure/persistance.js';
jest.mock('../../src/infrastructure/persistance.js');


beforeEach(() => {
    flushRoster();
});

function flushRoster() {
    Roster.collection = [];
};

describe('roster work like roster', () => {
    it('exits must search in the colletion for a user and return true id exits', () => {
        const default_user = {
            id: 4256,
            first_name: 'Macho',
            username: 'Hijo de mano'
        };
        
        Roster.add(default_user);

        const result = Roster.exists(default_user.id);

        expect(result).toBeTruthy();
    });

    it('create should add a user to collection', () => {
        const usertoCreate = {
            id: 4256,
            first_name: 'Macho',
            username: 'Hijo de mano'
        };

        Roster.add(usertoCreate);

        expect(Roster.collection[0]).toStrictEqual(usertoCreate);
    });

    it('load of roster', () => {
        save.mockImplementationOnce(()=>{ 
            return true;
        });
        
        const default_user = {
            id: 42376,
            first_name: 'Machoa',
            username: 'Hijo de mano'
        };
        load.mockImplementationOnce(()=>{ 
            return [default_user];
        });

        const expected = default_user;
        Roster.addAndSave(default_user);
        Roster.load();
        const result = Roster.search(default_user.id);

        expect(result).toStrictEqual(expected);
       
    });

    it('load of roster return false when fs error on read ', () => {
        load.mockImplementationOnce(()=>{ 
            return false;
        });

        const result = Roster.load();
        expect(result).toBeFalsy();
    });
  
    it('load of roster create an empty collection when fs error on read ', () => {
        load.mockImplementationOnce(()=>{ 
            return false;
        });

        Roster.load();

        expect(Roster.collection).toEqual([]);
    });

    it('return a user object when search by id if user exsits', () => {
        const default_user = {
            id: 4256,
            first_name: 'Macho',
            username: 'Hijo de mano'
        };
        Roster.add(default_user)
        const default_user2 = {
            id: 2548,
            first_name: 'hector',
            username: 'lolailo'
        };
        Roster.add(default_user2)

        const result= Roster.search(default_user.id);

        expect(result).toEqual(default_user);
    });
});