import { User } from "../user";

const Users = jest.fn();

Users.ensure = jest.fn();
Users.describe = jest.fn();
Users.describeReceipt = jest.fn();
Users.get = jest.fn();
Users.parseId = jest.fn();

export {Users};