
class Transaction {
    constructor(payer, money, receiver) {
        this.payer = payer;
        this.money = money;
        this.receiver = receiver;
    }
}
class Calculator {
    static distributeExpenses(expensesOfChat) {
        let TheCalculation = new Calculator();
        let result = TheCalculation.makeTotalsByUserId(expensesOfChat);
        const userKeys = result;
        result = TheCalculation.prepareDiff(result);
        result = TheCalculation.resolveExpenses(result);
        result.forEach((transaction) => {
            transaction.payer = userKeys[transaction.payer].id;
            transaction.receiver = userKeys[transaction.receiver].id;
        })
        return result;
    }

    resolveExpenses(inputArray) {
        const arrayOrdenadoDeMenorAMayor = inputArray.slice().sort(function (a, b) { return a - b; });
        const arraykeys = arrayOrdenadoDeMenorAMayor.map(function (element) { return inputArray.indexOf(element) });
        let i = 0;
        let j = arrayOrdenadoDeMenorAMayor.length - 1;
        let loQueDebe = 0;
        let saldoIntermedio = 0;
        const pago = [];
        let valorDelPago = 0;
        let pagador = undefined;
        let receptor = undefined;
        while (Calculator.aunDebeAlguienDinero(arrayOrdenadoDeMenorAMayor) && (i < j)) {
            loQueDebe = arrayOrdenadoDeMenorAMayor[i];
            saldoIntermedio = loQueDebe + arrayOrdenadoDeMenorAMayor[j];
            if (saldoIntermedio >= 0) {
                valorDelPago = loQueDebe; // se paga todo lo que ya debia y ya no debe mas
                pagador = arraykeys[i];  // el id del pagador en el array inicial
                receptor = arraykeys[j];
                pago.push(new Transaction(pagador, Math.abs(valorDelPago), receptor));
                arrayOrdenadoDeMenorAMayor[i] = 0;
                arrayOrdenadoDeMenorAMayor[j] = valorDelPago + arrayOrdenadoDeMenorAMayor[j];
                i++;
            }
            else {
                valorDelPago = arrayOrdenadoDeMenorAMayor[j]; // se paga todo lo que ya debia y ya no debe mas
                pagador = arraykeys[i];  // el id del pagador en el array inicial
                receptor = arraykeys[j];
                pago.push(new Transaction(pagador, Math.abs(valorDelPago), receptor));
                arrayOrdenadoDeMenorAMayor[i] = arrayOrdenadoDeMenorAMayor[i] + valorDelPago;
                arrayOrdenadoDeMenorAMayor[j] = 0;
                j--;
            }
        }
        return pago;
    }

    static aunDebeAlguienDinero(arrayOrdenadoDeMenorAMayor) {
        return arrayOrdenadoDeMenorAMayor.some(value => value < 0);
    }

    makeTotalsByUserId(theCollection) {
        let resultArray = [];

        theCollection.forEach((expense) => {
            if (!resultArray[`_${expense.id}`]) {
                resultArray[`_${expense.id}`] = 0 + Number.parseFloat(expense.money);
            } else {

                resultArray[`_${expense.id}`] += Number.parseFloat(expense.money);
            }
        });
        let result = [];
        Object.entries(resultArray).forEach((totalUser) => { result.push({ id: Number.parseInt(totalUser[0].replace('_', '')), total: Number.parseFloat(totalUser[1]) }) });

        return result;
    }

    prepareDiff(theUserTotalsObject) {
        let resultArray = [];
        let total = 0;

        theUserTotalsObject.forEach((totalUser) => {
            total += totalUser.total;
        });

        theUserTotalsObject.forEach((totalUser) => {
            resultArray.push(totalUser.total - total / theUserTotalsObject.length);
        });

        return resultArray;;
    }






}

export { Calculator };