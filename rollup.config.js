import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
// import {uglify} from 'rollup-plugin-uglify'

import pkg from './package.json'

export default [
	// browser-friendly UMD build
	{
		input: 'lib/index.ts',
		output: {
      name: 'react-modalized',
			file: pkg.browser,
			format: 'umd'
    },
    external: ['react, react-dom'],
		plugins: [
			typescript(),
			resolve(), // so Rollup can find `react`
			commonjs() // so Rollup can convert `ms` to an ES module
		],
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'lib/index.ts',
		external: ['react, react-dom'],
		output: [
			{file: pkg.main, format: 'cjs'},
			{file: pkg.module, format: 'es'}
		]
	}
]