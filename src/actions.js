'use strict';

import { Messages } from './infrastructure/messages.js';
import { Parser } from './helpers/parser.js';
import { Calculator } from './helpers/calculator.js';
import { Expenses } from './expenses/expenses.js';
import { Users } from './users/users.js';
const axios = require('axios');
const cheerio = require('cheerio');
const Path = require('path');
const fs = require('fs');


class Actions {

    static getHelp(user_ctx) {
        return Messages.retrieve(user_ctx.language_code, 'help');
    }

    static getIntroduction(user_ctx) {
        return Messages.retrieve(user_ctx.language_code, 'intro');
    }

    static load() {
        Users.load();
        Expenses.load();
    }

    static newUser(chat_id = '', user_ctx, message = '') {
        let answer = '';
        let userMessage = '';

        const theUser = {
            id: Parser.extractId(user_ctx),
            first_name: Parser.extractFirstName(user_ctx),
            username: Parser.extractName(user_ctx)
        };

        if (Users.ensure(theUser)) {
            const keysUserMessage = Users.describe(theUser);
            userMessage = Messages.parse(user_ctx.language_code, keysUserMessage);
            answer = Messages.retrieve(user_ctx.language_code, 'user.exits');

        } else {
            const keysUserMessage = Users.describe(theUser);
            userMessage = Messages.parse(user_ctx.language_code, keysUserMessage);
            answer = Messages.retrieve(user_ctx.language_code, 'user.new_user');

            const ghostExpense = '0';
            Actions.addExpense(chat_id, user_ctx, ghostExpense);
        }

        const result = `${answer}: ${userMessage}`;

        return result;
    }

    static addExpense(chat_id, user_ctx, message) {

        const theExpense = {
            money: Parser.extractMoney(message),
            concept: Parser.extractConcept(message),
            date: Parser.extractDate(message)
        };

        Users.ensure(user_ctx);
        const expenseKeys = Expenses.add(chat_id, user_ctx.id, theExpense);
        const expense = parseId(user_ctx.language_code, expenseKeys);

        const answer = Messages.retrieve(user_ctx.language_code, 'expense.added');
        const result = `${answer}: ${expense}`;

        return result;
    }

    static showExpenses(chat_id, user_ctx = '', message = '') {
        const expensesWithKeys = Expenses.show(chat_id);
        const expenses = parseId(user_ctx.language_code, expensesWithKeys);

        return expenses;
    }

    static showBill(chat_id, user_ctx = '', message = '') {

        const expensesOfChat = Expenses.getExpensesByChatId(chat_id);
        const receipt = Calculator.calculateBill(expensesOfChat);
        const billKeys = Users.describeReceipt(receipt);
        const bill = Messages.parse(user_ctx.language_code, billKeys);

        const answer = Messages.retrieve(user_ctx.language_code, 'bill');
        const result = `${answer}: ${bill}`;

        return result;
    }

    static async sendRelateImage(chat_id, user_ctx = '', message = '') {
        let concept = Parser.extractConcept(message);
        let theimageurl = await getImage(concept);
        let thefile = await downloadImage(theimageurl, concept);
        await delay(1000);
        return thefile;
    }

}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


async function getImage(concept) {
    try {
        const response = await axios.get(`https://www.google.com/search?q=${concept}&tbm=isch`);
        // const response = await axios.get(https://commons.wikimedia.org/w/index.php?search=${concept}&title=Special:MediaSearch&go=Go&type=image);
        return new Promise((resolve, reject) => {
            const $ = cheerio.load(response.data);
            const scrapedata = $("img");
            let imageurl = (scrapedata[13].attribs.src);
            resolve(imageurl);
            reject('error reject');
        });
    } catch (error) {
        console.log('el error');
        return new Promise((resolve, reject) => {
            resolve(false);
            reject('error reject');
        });
    }
};

async function downloadImage(imageUrl, imageName) {
    if (!imageUrl) {
        return new Promise((resolve) => {
            resolve('./default.jpg');
        });
    }
    let pathImage = Path.resolve('images', `${imageName}.jpg`);
    const writer = fs.createWriteStream(pathImage)
    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream'
    })
    response.data.pipe(writer)
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve(pathImage))
        writer.on('error', reject)
    })
}


function parseId(user_language_code, expensesWithKeys) {
    const messageWithId = expensesWithKeys;
    const messageWithNameAndKeys = Users.parseId(messageWithId);
    const message = Messages.parse(user_language_code, messageWithNameAndKeys);

    return message;
}


export { Actions };