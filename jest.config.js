module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/presentation/protocols/index.ts'
  ],
  coverageDirectory: 'coverage',
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
