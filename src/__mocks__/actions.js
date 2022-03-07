
const Actions = jest.fn();

Actions.getHelp = jest.fn();
Actions.sendRelateImage = jest.fn().mockImplementationOnce(() => {
    new Promise ((resolve, reject) => {
        resolve(true);
    });
});

export { Actions };