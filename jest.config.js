module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    'loca-boot-common': '<rootDir>/packages/common/src/index.ts',
    'loca-boot-core': '<rootDir>/packages/core/src/index.ts',
    'loca-boot-service': '<rootDir>/packages/service/src/index.ts',
  },
  testMatch: ['**/tests/**/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/',
  transformIgnorePatterns: [
    '!<rootDir>/node_modules/'
  ],
}
