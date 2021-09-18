module.exports = {
  roots: [
    "<rootDir>/tests"
  ],
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testMatch: [
    "**/tests/**/*.spec.ts"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testEnvironment: 'node',
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
}
