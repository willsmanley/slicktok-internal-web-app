// We are using .eslintrc.json instead of .eslintrc.js
// because eslint is not currently compatible with module
// syntax for .eslintrc* and .cjs does not work

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'prettier'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.cjs'],
  },
  extends: [
    'prettier',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['/*.*'], // ignore the .eslintrc.cjs file itself
  rules: {
    // Need to use require for integrations
    '@typescript-eslint/no-var-requires': 'off',

    // Need this for for loops. Its supposed to allow that but it wasnt.
    'no-plusplus': 'off',

    // void is useful sometimes
    'no-void': 'off',

    // Throw errors for un-prettified files
    'prettier/prettier': 'error',

    // Allow console logging
    'no-console': 'off',

    // Allow using "return await something()"
    'no-return-await': 'off',

    // Allow variables like _dontUse
    'no-underscore-dangle': 'off',

    // Don't require file extensions for JS-related files. They are auto-handled.
    // "import/extensions": [
    //   "error",
    //   "ignorePackages",
    //   {
    //     "js": "never",
    //     "jsx": "never",
    //     "ts": "never",
    //     "tsx": "never",
    //   }
    // ],

    // TODO: look into resolving these...
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',

    // Preferring default export is sometimes undesirable
    'import/prefer-default-export': 'off',

    // We break these rules on purpose in Redux Toolkit slices
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // We should be able to use `let` in a destructure
    // even if one destructured value is not reassigned
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],

    // See: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use
    'no-use-before-define': 'off',

    // not sure what the problem is here, but it keeps thinking im trying to use "any" in a template
    // See Compare Page in alt attribute
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts', 'setupTests.ts'],
      rules: {
        // We don't need to list testing deps in deps, keeping them in dev-deps is fine
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        paths: ['src'],
      },
    },
  },
};
