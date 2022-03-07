module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  
  modulePathIgnorePatterns: [
    "_integration",
    "<rootDir>/testdata/"
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/testdata/",
    "<rootDir>/images/"
  ]
};