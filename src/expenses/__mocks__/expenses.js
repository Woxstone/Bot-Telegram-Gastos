const Expenses = jest.fn();

Expenses.add = jest.fn();
Expenses.show = jest.fn();
Expenses.showExpensesArray = jest.fn();
Expenses.description = jest.fn();
Expenses.load = jest.fn().mockReturnValueOnce(true);

export { Expenses };