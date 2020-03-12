module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    semi: false,
    printWidth: 100,
    useTabs: false,
    tabWidth: 4,
    overrides: [
        {
            files: '.prettierrc',
            options: { parser: 'json' },
        },
    ],
}
