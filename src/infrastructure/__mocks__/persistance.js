import { load, save } from '../persistance.js';

jest.mock('../persistance.js', () => {
    const persistanceMock = jest.requireActual('../persistance.js');

    return {
        __esModule: true,
        ...persistanceMock,
        load: jest.fn(),
        save: jest.fn()
    }
});

export { load, save };