const fs = require('fs-extra');
const swcrc = fs.readJSONSync(`${__dirname}/.swcrc`, 'utf-8');

/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.stories.*'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|jpg|png|gif)$': '<rootDir>.jest/emptyLoader.js',
    '\\.svg$': '<rootDir>.jest/svgrMock.js'
  },
  setupFiles: ['<rootDir>.jest/registerContext.js'],
  setupFilesAfterEnv: ['<rootDir>.jest/setupTests.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!@mikematos84/design-tokens)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  ...(process.env?.TRANSPILER === 'swc' && {
    transform: {
      '^.+\\.[jt]sx?$': ['@swc/jest', { ...swcrc }]
    }
  })
};
