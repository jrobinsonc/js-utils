import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/.history/**', 'node_modules/**', 'dist/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-inferrable-types': 'off', // Explicit type annotations improve code readability and make intent clearer, especially in utility functions where type safety is paramount.
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
);
