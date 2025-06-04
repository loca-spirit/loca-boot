module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@model-base/common': '<rootDir>/packages/common/src/index.ts',
    '@model-base/core': '<rootDir>/packages/core/src/index.ts',
    '@model-base/service': '<rootDir>/packages/service/src/index.ts',
  },
  testMatch: ['**/tests/**/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  transformIgnorePatterns: ['!<rootDir>/node_modules/'],
}
