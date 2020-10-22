module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
  ],
}
