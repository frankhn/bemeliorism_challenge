module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: [
    'js',
    'ts',
    'node',
  ],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'src/database/*',
    'src/config',
    'src/swagger',
    'dist',
  ],
  verbose: true,
  collectCoverageFrom: ['src/**/*.*'],
  coverageThreshold: {
    global: {
      functions: 0,
      lines: 0,
      statements: -10000,
    },
  },
  testMatch: ['<rootDir>/src/**/__tests__/**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.ts?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
