module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    // 'plugin:prettier/recommended',
    // 'plugin:prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'array-callback-return': 'off',
    extensions: 'off',
    'import/extensions': 0,
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src/'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
