// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // coverageThreshold: {
  //   global: {
  //     branches: 95,
  //     functions: 95,
  //     lines: 95,
  //     statements: -5
  //   }
  // },
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'node_modules/'
  ],
  testMatch: [
    '**/tests/*.js'
  ]
}
