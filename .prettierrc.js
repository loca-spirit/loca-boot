module.exports = {
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  semi: false, // 语句结尾统一不使用分号
  singleQuote: true, // 全程使用单引号
  trailingComma: 'all', // 结尾处不允许逗号
  printWidth: 120,
  organizeImportsSkipDestructiveCodeActions: true,
  // 与 eslint 保持一致，避免冲突
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended'],
  plugins: ['prettier-plugin-organize-imports'],
}
