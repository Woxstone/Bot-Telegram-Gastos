const Parser = jest.fn();

Parser.extractMoney = jest.fn();
Parser.extractConcept = jest.fn();
Parser.extractDate = jest.fn();
Parser.extractId = jest.fn();
Parser.extractFirstName = jest.fn();
Parser.extractName = jest.fn();

export { Parser }