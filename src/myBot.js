import { Telegraf } from 'telegraf';
import 'dotenv/config';
import { Actions } from './actions.js';

class MyBot {

    constructor() {
        this.bot = this.build();
        this.configure();
    }

    build() {
        const realBotKey = process.env.BOT_TOKEN;
        const theBot = new Telegraf(realBotKey);
        return theBot;
    }

    configure() {
        this.addHelp()
        this.addIntroduction()
        this.addCommands()
    }

    addCommands() {
        this.bot.command('addgasto', (ctx) => this.runAction(ctx, Actions.addExpense));
        this.bot.command('nuevo_usuario', (ctx) => this.runAction(ctx, Actions.newUser));
        this.bot.command('gastos', (ctx) => this.runAction(ctx, Actions.showExpenses));
        this.bot.command('cuenta', (ctx) => this.runAction(ctx, Actions.showBill));
    }

    addHelp() {
        this.bot.help((ctx) => this.runAction(ctx, Actions.getHelp));
    }

    addIntroduction() {
        this.bot.start((ctx) => this.runAction(ctx, Actions.getIntroduction));
    }

    runAction(ctx, action) {
        const user_ctx = ctx.message.from;
        const chat_id = ctx.chat.id;
        const message = this.clean(ctx.message.text);
        ctx.reply(action(chat_id, user_ctx, message));
    }

    clean(text) {
        let cleaned = text;
        cleaned = cleaned.replace(/^\/\S+ /, '');
        return cleaned;
    }

    load() {
        Actions.load();
    }

    start() {
        this.load();
        this.bot.launch();
    }

    stop(singal) {
        this.bot.stop(singal);
    }

};

export { MyBot };