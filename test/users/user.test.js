import { User } from '../../src/users/user.js';

describe('Test of the user constructor', () => {
    it('the constructor must have id, first_name, username', () => {
        const default_user = {
            id: 585,
            first_name: 'Nacho',
            username: 'edfada'
        };
        
        const user = new User(default_user.id, default_user.first_name, default_user.username);

        expect(user.id).toBeDefined();
        expect(user.first_name).toBeDefined();
        expect(user.username).toBeDefined();
    });
});