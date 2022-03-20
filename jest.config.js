const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	resetMocks: true,
	restoreMocks: true,
};

module.exports = createJestConfig(customJestConfig);
