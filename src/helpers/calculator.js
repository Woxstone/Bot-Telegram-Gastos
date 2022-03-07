class Transaction {
    constructor(payer, money, receiver) {
        this.payer = payer;
        this.money = money;
        this.receiver = receiver;
    }
}

class Calculator {

    static calculateBill(expensesOfChat) {
        let result = [];
        const usersIdsAndTotals = Calculator.makeTotalsByUserId(expensesOfChat);
        if(usersIdsAndTotals.length == 1) {
            return usersIdsAndTotals;
        }
        const arrayOfdifferences = Calculator.prepareDiff(usersIdsAndTotals);
        let transactionsArray = Calculator.resolveExpenses(arrayOfdifferences);
        transactionsArray.forEach((transaction) => {
            transaction.payer = usersIdsAndTotals[transaction.payer].user_id;
            transaction.receiver = usersIdsAndTotals[transaction.receiver].user_id;
        });

        result = transactionsArray;

        return result;
    }

    static makeTotalsByUserId(expensesOfChat) {
        let expensesArray = [];
        let usersIdsAndTotals = [];

        expensesOfChat.forEach((expense) => {
            if (!expensesArray[`_${expense.user_id}`]) {
                expensesArray[`_${expense.user_id}`] = Number.parseFloat(expense.money);
            } else {
                expensesArray[`_${expense.user_id}`] += Number.parseFloat(expense.money);
            }
        });

        const usersTotals = Object.entries(expensesArray);
        usersTotals.forEach((totalOfUser) => {
            usersIdsAndTotals.push({
                user_id: Number.parseInt(totalOfUser[0].replace('_', '')),
                total: Number.parseFloat(totalOfUser[1])
            })
        });

        return usersIdsAndTotals;
    }

    static prepareDiff(usersIdsAndTotals) {
        let arrayOfdifferences = [];
        let total = 0;

        usersIdsAndTotals.forEach((totalExpenseOftheUser) => {
            total += totalExpenseOftheUser.total;
        });

        const numberOfUsers = usersIdsAndTotals.length;
        let totalExpeneOfUser = 0;
        usersIdsAndTotals.forEach((totalExpenseOftheUser) => {
            totalExpeneOfUser = totalExpenseOftheUser.total;
            const totalExpeneOfUserRounding = Calculator.roundToTwo(totalExpeneOfUser - total / numberOfUsers)
            arrayOfdifferences.push(totalExpeneOfUserRounding);
        });

        return arrayOfdifferences;
    }

    static resolveExpenses(arrayOfdifferences) {
        const ordenateArrayFromMinToMax = arrayOfdifferences.slice().sort(function (a, b) { return a - b; });
        const indexOfIds = ordenateArrayFromMinToMax.map(function (differences) { return arrayOfdifferences.indexOf(differences) });

        let indexOfPayer = 0;
        let indexOfReciver = ordenateArrayFromMinToMax.length - 1;
        let debt = 0;
        let provisionalAmount = 0;
        const payment = [];
        let valueOfThePayment = 0;
        let payer = undefined;
        let reciver = undefined;

        while (Calculator.stillPaymentsUnresolved(ordenateArrayFromMinToMax) && (indexOfPayer < indexOfReciver)) {
            debt = ordenateArrayFromMinToMax[indexOfPayer];
            provisionalAmount = debt + ordenateArrayFromMinToMax[indexOfReciver];
// sacar cosas fuera
            if (provisionalAmount >= 0) {
                valueOfThePayment = Calculator.roundToTwo(debt);
                payer = indexOfIds[indexOfPayer];
                reciver = indexOfIds[indexOfReciver];
                payment.push(new Transaction(payer, Math.abs(valueOfThePayment), reciver));
                ordenateArrayFromMinToMax[indexOfPayer] = 0;
                ordenateArrayFromMinToMax[indexOfReciver] = valueOfThePayment + ordenateArrayFromMinToMax[indexOfReciver];
                indexOfPayer++;
            }
            else {
                valueOfThePayment = Calculator.roundToTwo(ordenateArrayFromMinToMax[indexOfReciver]);
                payer = indexOfIds[indexOfPayer];
                reciver = indexOfIds[indexOfReciver];
                payment.push(new Transaction(payer, Math.abs(valueOfThePayment), reciver));
                ordenateArrayFromMinToMax[indexOfPayer] = ordenateArrayFromMinToMax[indexOfPayer] + valueOfThePayment;
                ordenateArrayFromMinToMax[indexOfReciver] = 0;
                indexOfReciver--;
            }
        }
        return payment;
    }

    static stillPaymentsUnresolved(ordenateArrayFromMinToMax) {
        return ordenateArrayFromMinToMax.some(value => value < 0);
    }

    static roundToTwo(num) {
        return +(Math.round(num + "e+2") + "e-2");
    }
}


export { Calculator };