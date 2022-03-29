'use strict';


const path = jest.createMockFromModule('path');

path.resolve = jest.fn();

module.exports = path;