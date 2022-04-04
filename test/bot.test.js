import { MyBot } from '../src/mybot.js';
import { Telegraf } from 'telegraf';
import { Actions } from '../src/actions.js';
jest.mock('../src/actions.js');



describe('it works ', () => {
    it('its a telegraf bot', () => {
        let aBot = new MyBot();
        expect(aBot.bot).toBeDefined();
        expect(aBot.bot).toBeInstanceOf(Telegraf);
    });
});

describe('has functions to handle messages', () => {
    it('can strip the command form the message', () => {
        let mybot = new MyBot();
        const message = '/anycommand cleaned message';
        expect(mybot.clean(message)).toBe('cleaned message');
    });
});

describe('method clean testing errors', () => {
    it('clean the /addgasto from /addgasto', () => {
        const expected = '';
        const intake = '/addgasto';
        const mybot = new MyBot();

        const result = mybot.clean(intake);

        expect(result).toBe(expected);
    });
});

describe('method getHelp testing', () => {
    it('get help should call action help', () => {
        const mybot = new MyBot();
        const default_ctx = {
            message: {
                from: {
                    user: 'fakeUser'
                },
                text: '/help'
            },
            chat: { id: 34 },

            reply: jest.fn()
        };
        const spyGetHelp = jest.spyOn(Actions, 'getHelp');

        mybot.runAction(default_ctx, Actions.getHelp);

        expect(spyGetHelp).toHaveBeenCalled();
    })
}) 

describe('method runAction testing', () => {
    it('when runAction have message /addgasto return help', () => {
        const default_ctx = {
            message: {
                from: {
                    user: 'fakeUser'
                },
                text: '/addgasto'
            },
            chat: { id: 34 },

            reply: jest.fn()
        };
        const action = Actions.getHelp;
        const spyGetHelp = jest.spyOn(Actions, 'getHelp');
        const mybot = new MyBot();
        mybot.runAction(default_ctx, action);

        expect(spyGetHelp).toHaveBeenCalled();
    });
});

describe('method runAsyncAction testing', () => {
    it('when runAsyncAction have message /addgasto return help', () => {
        const default_ctx = {
            message: {
                from: {
                    user: 'fakeUser'
                },
                text: '/addgasto'
            },
            chat: { id: 34 },

            reply: jest.fn(),
            replyWithPhoto: jest.fn()
        };
        const action = Actions.sendRelateImage;
        const spyGetHelp = jest.spyOn(default_ctx, 'replyWithPhoto');
        const mybot = new MyBot();
        mybot.runAsyncAction(default_ctx, action);

        expect(spyGetHelp).not.toHaveBeenCalled();
    });
});