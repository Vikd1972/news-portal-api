import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transformIgnorePatterns: [
    'node_modules/(?!variables/.*)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleFileExtensions: ['ts', 'json', 'js', 'd.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['*/**/*.test.ts'],
  modulePathIgnorePatterns: [
    './src/__mocks__',
    './src/db/entities',
    './src/db/migrations',
    './src/db/seeds',
    './src/db/BaseEntity.ts',
  ],
  coveragePathIgnorePatterns: [
    './src/db/entities',
    './src/db/migrations',
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^root(.*)$': '<rootDir>/src$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*'],
  forceExit: true,
  preset: 'ts-jest',
  verbose: true,
  detectOpenHandles: true,
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  clearMocks: true,
  resetMocks: true,
  // globalSetup: './src/__mocks__/jestBeforeAll.ts',
  // globalTeardown: './src/__mocks__/jestAfterAll.ts',
};

export default config;
