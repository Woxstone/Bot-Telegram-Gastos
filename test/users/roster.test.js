import { Roster } from '../../src/users/roster.js';
import fs from 'fs';
jest.mock('../../src/helpers/logger.js');
jest.mock('fs');

describe('roster work like roster', () => {
    it('exits must search in the colletion for a user and return true id exits', () => {
       
        const default_user = {
            id: 4256,
            first_name: 'Macho',
            username: 'Hijo de mano'
        };
        Roster.create(default_user);

        const result = Roster.exists(default_user.id);

        expect(result).toBeTruthy();
    });

    it('create should add a user to collection', () => {
        const usertoCreate = {
            id: 4256,
            first_name: 'Macho',
            username: 'Hijo de mano'
        };

        Roster.create(usertoCreate);

        expect(Roster.collection[0]).toStrictEqual(usertoCreate);
    });

    it('load of roster', () => {
        fs.writeFileSync.mockImplementationOnce(()=>{ 
            return true;
        });
        
        const default_user = {
            id: 42376,
            first_name: 'Machoa',
            username: 'Hijo de mano'
        };
        fs.readFileSync.mockImplementationOnce(()=>{ 
            return  Buffer.from(JSON.stringify([default_user]));
        });

        const expected = default_user;
        Roster.createAndSave(default_user);
        Roster.load();
        const result = Roster.search(default_user.id);

        expect(result).toStrictEqual(expected);
       
    });

    it('load of roster return false when fs error on read ', () => {
        fs.readFileSync.mockImplementationOnce(()=>{ 
            throw 'error;'
        });

        const result = Roster.load();
        expect(result).toBeFalsy();
    });
  
    it('load of roster create an empty collection when fs error on read ', () => {
        fs.readFileSync.mockImplementationOnce(()=>{ 
            throw 'error;'
        });
        const result = Roster.load();

        expect(Roster.collection).toEqual([]);
    });

    it('return a user object when search by id if user exsits', () => {
        const default_user = {
            id: 4256,
            first_name: 'Macho',
            username: 'Hijo de mano'
        };
        Roster.create(default_user)
        const default_user2 = {
            id: 2548,
            first_name: 'hector',
            username: 'lolailo'
        };
        Roster.create(default_user2)

        const result= Roster.search(default_user.id);

        expect(result).toEqual(default_user);
    });
});