const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@hooks/(.*)$': '<rootDir>/hooks/$1',
        '^@libs/(.*)$': '<rootDir>/libs/$1',
        '^@pages/(.*)$': '<rootDir>/pages/$1',
        '^@redux/(.*)$': '<rootDir>/redux/$1',
        '^@styles/(.*)$': '<rootDir>/styles/$1',
        '^@ctypes/(.*)$': '<rootDir>/ctypes/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
        '^@validation/(.*)$': '<rootDir>/validation/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
};

module.exports = createJestConfig(customJestConfig);
