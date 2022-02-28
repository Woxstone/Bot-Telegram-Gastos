
  const defaultUser = {
        id:1,
        first_name : 'mockedFirstName',
        username : 'mockedusername'
    }
  
  const userConstructorMock = jest.fn().mockImplementation(() => {
    return defaultUser;
  });
  const User = jest.fn();
  export const theUserConstructor = jest.spyOn(User.prototype, 'constructor')
    .mockImplementation(userConstructorMock);

  export { User };