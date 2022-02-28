import { MyBot } from '../src/mybot.js';
import { Telegraf } from 'telegraf';
import { Actions } from '../src/actions.js';
jest.mock('../src/actions.js')



describe('it works ',() => {
    xit('its a telegraf bot',() => {
        let aBot = new MyBot();
        expect(aBot.bot).toBeDefined();
        expect(aBot.bot).toBeInstanceOf(Telegraf);
    });
});

describe('has functions to handle messages',() => {
    xit('can strip the command form the message',() => {
        let mybot = new MyBot();
        const message = '/anycommand cleaned message';
        expect(mybot.clean(message)).toBe('cleaned message');
    });
});
