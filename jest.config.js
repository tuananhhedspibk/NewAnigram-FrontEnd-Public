module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "moduleNameMapper": {
    ".+\\.(css|scss|png|svg)$": "identity-obj-proxy"
  },
  globalTeardown: './src/tests/utils/teardown.ts',
  testTimeout: 10000,
};