module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended',
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'sonarjs', 'jest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'prettier/prettier': ['error'],
        'react/jsx-filename-extension': ['off'],
        'sonarjs/cognitive-complexity': ['error', 20],
        'import/prefer-default-export': ['off'],
        'jest/no-disabled-tests': ['off'],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
      },
    },
  ],
};
