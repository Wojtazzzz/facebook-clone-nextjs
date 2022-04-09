const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@styles/(.*)$': '<rootDir>/styles/$1',
        '^@pages/(.*)$': '<rootDir>/pages/$1',
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@redux/(.*)$': '<rootDir>/redux/$1',
        '^@hooks/(.*)$': '<rootDir>/hooks/$1',
        '^@libs/(.*)$': '<rootDir>/libs/$1',
        '^@validation/(.*)$': '<rootDir>/validation/$1',
        '^@ctypes/(.*)$': '<rootDir>/ctypes/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
        '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
