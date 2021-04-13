module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    // 'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // TODO: typescript 会一直触发eslint报错
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    // '@typescript-eslint',
  ],
  rules: {
    'max-classes-per-file': ['error', 2],
    'no-continue': 0,
    'no-shadow': 'off',
    'no-use-before-define': ['error', { functions: false }],
  },
};
