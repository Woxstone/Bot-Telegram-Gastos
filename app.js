import { MyBot } from './src/myBot.js';

const bot = new MyBot();
bot.start();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))