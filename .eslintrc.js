module.exports = {
	extends: [
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:react/recommended',
		'plugin:jsdoc/recommended',
		'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		}
	},
	settings: {
		react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		}
	},
	plugins: [ 'react', 'jsdoc', 'jsx-a11y', 'import', 'eslint-plugin-react', 'react-redux', '@babel' ],
	env: {
		browser: true,
		jest: true,
		es6: true
	},
	rules: {
		'import/no-extraneous-dependencies': [ 'error', { devDependencies: true } ],
		'import/prefer-default-export': 'off',
		'react/jsx-filename-extension': [ 1, { extensions: [ '.js', '.jsx' ] } ],
		'react/prefer-stateless-function': [ 0 ],
		'react/jsx-indent': [ 0 ],
		'react/sort-comp': [ 0 ],
		'react/destructuring-assignment': [ 0 ],
		'react/forbid-prop-types': [ 0 ],
		'react/no-unescaped-entities': [ 'error', { forbid: [ '>', '}' ] } ],
		'react/jsx-fragments': [ 'off' ],
		quotes: [ 'error', 'single', { avoidEscape: true, allowTemplateLiterals: false } ],
		'jsx-quotes': [ 'error', 'prefer-double' ],
		'no-use-before-define': 'off',
		'prettier/prettier': 'off',
		semi: [ 'error', 'always' ],
		'no-underscore-dangle': [ 'off', { allow: [ '_timedOut', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' ] } ],
		// 'max-len': ['error', { code: 120 }],
		'no-shadow': [ 'error', { allow: [ 'err', 'permission' ] } ],
		'class-methods-use-this': 'off',
		'import/extensions': 'off',
		'max-classes-per-file': 'off',
		'no-console': 'off',
		'no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 0 } ]
	},
	globals: {
		fetch: false
	}
};
