module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:sonarjs/recommended',
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'sonarjs'],
  rules: {
    /** Sonar rules */
    'sonarjs/cognitive-complexity': ['warn', 30], // High connitive complexity for the moment, switch to 15
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-identical-functions': 'off',

    /** Import */
    'import/no-cycle': 2,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'sort-imports': [
      1,
      {
        ignoreDeclarationSort: true,
      },
    ],
    'import/no-unresolved': 0,

    /** Others */

    // 'no-unused-vars': 0,
    // '@typescript-eslint/no-unused-vars': 2,
    // 'no-useless-constructor': 0,
    // '@typescript-eslint/no-useless-constructor': 2,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'no-undef': 0,
    'no-alert': 0,
    'global-require': 0,

    // This one is debatable
    'no-restricted-syntax': 0,

    // Because it doesn't parse correct package.json
    'import/no-extraneous-dependencies': 0,

    // Because in this project the api return snake_case
    camelcase: 0,
    '@typescript-eslint/camelcase': 0,

    // Because we need that to mutate the state
    'no-param-reassign': 0,

    'no-continue': 0,
    'no-await-in-loop': 1,

    // This rules are dump
    'no-bitwise': 0,
    'no-plusplus': 0,
    'import/extensions': 0,

    // Some override needs empty functions
    '@typescript-eslint/no-empty-function': 0,

    // Fix rules conflict
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    semi: 'off',
    '@typescript-eslint/semi': ['error'],

    // @todo those should be enabled, disabled for debugging
    'no-console': 0,
    '@typescript-eslint/no-explicit-any': 0,

    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
      },
    ],

    'max-len': [
      'warn',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,

        // ignore multiline in pug part of vue files
        ignorePattern: '^\\s*:?[\\w-]+=["\'].*["\']$',
      },
    ],

    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        printWidth: 100,
        trailingComma: 'all',
        singleQuote: true,
      },
    ],
  },
};
