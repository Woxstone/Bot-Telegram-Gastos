
const Actions = jest.fn();

Actions.getHelp = jest.fn();
Actions.sendRelateImage = jest.fn().mockImplementation(() => {
    new Promise ((resolve, reject) => {
        resolve(true);
    });
});

export { Actions };