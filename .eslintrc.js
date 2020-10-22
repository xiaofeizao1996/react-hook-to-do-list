module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  rules: {
    '@typescript-eslint/semi': ['off'],
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'react/jsx-indent': ['error', 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/jsx-indent-props': [2, 2],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/prop-types': [0],
    'arrow-parens': [2, 'as-needed'],
    'object-curly-newline': [
      'off',
      {
        ObjectExpression: { multiline: true },
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'implicit-arrow-linebreak': ['off'],
    'import/prefer-default-export': ['off'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
