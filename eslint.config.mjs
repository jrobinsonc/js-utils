import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/.history/**', 'node_modules/**', 'dist/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // These rules are defined as errors by "strictTypeChecked" and "stylisticTypeChecked", but do they really cause errors? No. This makes DX worse.
    // Imagine you create a class you plan to finish later with only the constructor. You'll get the "no-extraneous-class" error and won't be able to transpile.
    // If you're like me, you'll get annoyed by that error the whole time and won't be able to focus.
    // So they should be categorized as warnings.
    // The whole idea of this approach is to make sure you can see things that could really break your code and fix them as soon as possible, while letting warnings be warnings.
    rules: {
      // ================================================================
      //  Error Prevention - Catch bugs and potential runtime errors
      // ================================================================
      'no-shadow': 'error',
      'no-undef': 'error',
      'no-unreachable': 'warn',
      'no-var': 'warn',
      'prefer-const': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-for-in-array': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'error',

      // ================================================================
      // Code Quality - Maintainability, readability, best practices
      // ================================================================
      'no-alert': 'warn',
      'no-else-return': 'warn',
      'no-empty-pattern': 'warn',
      'no-empty': 'warn',
      'no-useless-catch': 'warn',
      'vars-on-top': 'warn',
      'max-classes-per-file': 'warn',
      'no-warning-comments': 'warn', // Maintain visibility over FIXMEs and TODOs comments
      '@typescript-eslint/no-extraneous-class': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off', // Explicit type annotations improve readability and make intent clearer, especially in utility functions where type safety is paramount.
      '@typescript-eslint/no-unnecessary-type-parameters': 'warn',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-unnecessary-type-conversion': 'warn',
      '@typescript-eslint/no-unnecessary-template-expression': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/promise-function-async': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-confusing-void-expression': [
        'warn',
        {
          ignoreArrowShorthand: true,
          ignoreVoidOperator: false,
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/typedef': [
        'warn',
        {
          arrayDestructuring: true,
          objectDestructuring: true,
          arrowParameter: true,
          memberVariableDeclaration: true,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: true,
        },
      ],

      // ================================================================
      // Code Style - Formatting and stylistic consistency
      // ================================================================
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'no-continue': 'warn',
      semi: 'warn',
      '@typescript-eslint/consistent-indexed-object-style': 'warn',
      '@typescript-eslint/consistent-type-definitions': 'warn',
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',

      // ================================================================
      // Performance - Performance-related rules
      // ================================================================
      'prefer-destructuring': 'warn', // Can improve performance by avoiding repeated property access
      'prefer-template': 'warn', // Template literals are generally faster than string concatenation
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // More efficient than || for null/undefined checks
      '@typescript-eslint/dot-notation': 'warn', // Bracket notation can be slower than dot notation

      // ================================================================
      // Security - Security-related rules
      // ================================================================
      'no-param-reassign': 'warn',
      'no-debugger': 'warn', // Debug statements can make the expose of sensitive information easier to see, which is not good in production
      'no-console': 'warn', // Console statements should not show up in production
      eqeqeq: 'warn', // Prevents type coercion vulnerabilities
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-implied-eval': 'warn', // Prevents code injection
    },
  },
  {
    // Disable type checking for non-ts files
    // https://typescript-eslint.io/users/configs/#disable-type-checked
    files: ['**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // We don't need to be that strict with tests
      '@typescript-eslint/typedef': 'off',
    },
  },
);
