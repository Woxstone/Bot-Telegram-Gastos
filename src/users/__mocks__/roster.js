
const Roster = jest.fn();


Roster.exists = jest.fn();
Roster.addAndSave= jest.fn();
Roster.search = jest.fn();
Roster.collection =jest.fn();
Roster.load =jest.fn();


export { Roster };