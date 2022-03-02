const Ledger = jest.fn();

Ledger.collection = jest.fn().mockReturnValue({});
Ledger.ensure = jest.fn();
Ledger.save = jest.fn();
Ledger.ensureAndSave = jest.fn();
Ledger.load = jest.fn();
Ledger.getByChatId = jest.fn();

export { Ledger };