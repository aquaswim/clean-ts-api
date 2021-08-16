/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv-safe/config.js'],
    globalTeardown: '<rootDir>/__test__/teardown.ts',
    setupFilesAfterEnv: ['<rootDir>/__test__/reflect-metadata.ts'],
};
