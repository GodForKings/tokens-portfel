import { defineConfig } from 'eslint/config'
import nextPlugin from '@next/eslint-plugin-next'
import tsEslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { fixupPluginRules } from '@eslint/compat'

export default defineConfig([
	// Официальная поддержка Next.js 16
	{
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
		},
	},

	// TypeScript + React
	...tsEslint.configs.recommended,

	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsEslint.parser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: import.meta.dirname,
			},
		},

		plugins: {
			'unused-imports': unusedImports,
			import: fixupPluginRules(importPlugin),
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
			prettier: prettierPlugin,
		},

		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},

		rules: {
			// Удаление мусора — мгновенно при сохранении
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'error',
				{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
			],

			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
					pathGroups: [
						{ pattern: 'react', group: 'builtin', position: 'before' },
						{ pattern: 'next', group: 'builtin', position: 'before' },
						{ pattern: 'next/**', group: 'builtin', position: 'before' },
						{ pattern: '@/app/**', group: 'internal', position: 'before' },
						{ pattern: '@/processes/**', group: 'internal', position: 'before' },
						{ pattern: '@/pages/**', group: 'internal', position: 'before' },
						{ pattern: '@/widgets/**', group: 'internal', position: 'before' },
						{ pattern: '@/features/**', group: 'internal', position: 'before' },
						{ pattern: '@/entities/**', group: 'internal', position: 'before' },
						{ pattern: '@/shared/**', group: 'internal', position: 'before' },
						{ pattern: '@/**', group: 'internal' },
					],
					pathGroupsExcludedImportTypes: ['type'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],

			// TypeScript — жёстко, как у взрослых
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unused-vars': 'off',

			// React Hooks
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',

			// a11y
			'jsx-a11y/alt-text': 'error',
			'jsx-a11y/anchor-is-valid': 'error',

			// Prettier
			'prettier/prettier': 'error',
		},
	},

	// Игноры
	{
		ignores: [
			'.next/**',
			'node_modules/**',
			'out/**',
			'dist/**',
			'**/*.d.ts',
			'.vercel/**',
			'.eslintcache',
		],
	},
])
