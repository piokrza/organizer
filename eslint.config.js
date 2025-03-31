const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: { import: require('eslint-plugin-import') },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'org',
          style: 'kebab-case',
        },
      ],
      'import/order': [
        'error',
        {
          'alphabetize': { order: 'asc' },
          'groups': [['builtin'], ['sibling', 'parent'], 'external', 'internal', 'index', 'object'],
          'pathGroups': [
            { pattern: '#*/**', group: 'internal', position: 'after' },
            {
              pattern: '@ionic/**',
              group: 'external',
              position: 'after',
            },
          ],
          'pathGroupsExcludedImportTypes': ['internal'],
          'newlines-between': 'always',
          'warnOnUnassignedImports': true,
        },
      ],
      'import/first': 'error',
      'import/no-unresolved': 'off',
      'import/no-self-import': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      '@typescript-eslint/member-ordering': [
        1,
        {
          default: [
            'constructor',
            'private-static-field',
            'public-static-field',
            'static-field',
            'instance-field',
            'public-instance-method',
            'private-instance-method',
          ],
        },
      ],
      'no-console': 'error',
      'no-debugger': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'error',
      '@angular-eslint/template/mouse-events-have-key-events': 'error',
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/use-track-by-function': 'error',
    },
  }
);
