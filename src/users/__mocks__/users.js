const Users = jest.fn();

Users.ensure = jest.fn();
Users.describe = jest.fn();
Users.describeReceipt = jest.fn();
Users.parseId= jest.fn();
Users.load = jest.fn();

export {Users};