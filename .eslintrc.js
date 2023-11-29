module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@react/no-unescaped-entities': 0,
    '@typescript-eslint/no-confusing-void-expression': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    'multiline-ternary': ['error', 'never'],
  },
};
