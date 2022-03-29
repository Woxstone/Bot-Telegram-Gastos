import { load } from '../../src/infrastructure/persistance.js';
import { save } from '../../src/infrastructure/persistance.js';
import fs from 'fs';
jest.mock('fs');
jest.mock('../../src/helpers/logger.js');

describe('Testing load fuction', () => {
    it('Load should load the info of the require placeholder', () => {
        const path = './load';
        const expected = { examples: [] };
        fs.readFileSync.mockReturnValueOnce(Buffer.from(JSON.stringify(expected)));

        const result = load(path);

        expect(result).toEqual(expected);
    });

    it('Load return false if fs fail', () => {
        const path = './';

        fs.readFileSync.mockImplementationOnce(() => { throw new Error(); });

        const result = load(path);

        expect(result).toBeFalsy();
    });
});

describe('Testing save fuction', () => {
    it('Save should save the info in the right place', () => {
        const path = './save';
        const intake = { examples: [] };

        fs.writeFileSync.mockReturnValueOnce(true);

        const result = save(path, intake);

        expect(result).toBeTruthy();
    });

    it('Save return false if fs fail', () => {
        const path = './';
        const intake = { examples: [] };

        fs.writeFileSync.mockImplementationOnce(() => { throw new Error(); });

        const result = save(path, intake);

        expect(result).toBeFalsy();
    });
});