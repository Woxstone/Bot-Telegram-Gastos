
export const expenseDescriptionMock = jest.fn().mockImplementation(() => {
  return 'undefined';
});

const defaultExp = {
  money: 44,
  concept: 'sardinas',
  date: '25/03/2022',
  id: 32,
  description: expenseDescriptionMock
};

const ExpenseConstructorMock = jest.fn().mockImplementation(() => {
  return defaultExp;
});

const Expense = jest.fn();
export const theExpenseConstructor = jest.spyOn(Expense.prototype, 'constructor')
  .mockImplementation(ExpenseConstructorMock);


export { Expense };