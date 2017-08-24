module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['prettier'],
  extends: 'eslint:recommended',
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],

    'prettier/prettier': ['error', { singleQuote: true }]
  }
};
