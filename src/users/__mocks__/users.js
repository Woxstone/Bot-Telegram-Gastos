const Users = jest.fn();

Users.ensure = jest.fn();
Users.describe = jest.fn();

export {Users};