module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off', // Разрешаем for-in
    'guard-for-in': 'off', // Отключаем требование hasOwnProperty для учебных целей
  },
}
