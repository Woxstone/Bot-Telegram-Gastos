const Users = jest.fn();

Users.ensure = jest.fn();
Users.describe = jest.fn();
Users.describeReceipt = jest.fn();

export {Users};