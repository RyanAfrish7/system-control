export default [
	// CommonJS version, for Node, Browserify & Webpack
	{
		input: ['src/index.js'],
		output: {
			dir: './',
			format: 'cjs',
			sourcemap: false
		},
		experimentalCodeSplitting: true,
		experimentalDynamicImport: true
	}
];
