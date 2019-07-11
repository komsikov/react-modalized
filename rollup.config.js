import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import replace from 'rollup-plugin-replace'
import {terser} from 'rollup-plugin-terser'

import pkg from './package.json'


const production = !process.env.ROLLUP_WATCH

export default [
  {
    input: 'lib/index.ts',
    output: {
      name: 'react-modalized',
			file: pkg.browser,
			format: 'umd',
    },
    external: [
      'React', 'ReactDOM',
      // ...Object.keys(pkg.dependencies),
      // ...Object.keys(pkg.devDependencies),
      // ...Object.keys(pkg.peerDependencies),
    ],
    plugins: [
      replace({'process.env.NODE_ENV': JSON.stringify('production')}),
      typescript(),
      resolve(),
      commonjs({
        include: [
          'node_modules/**',
        ],
        exclude: [
          'node_modules/process-es6/**',
        ],
        namedExports: {
          'node_modules/react/index.js': [
            'Children',
            'Component',
            'PureComponent',
            'PropTypes',
            'createElement',
            'Fragment',
            'cloneElement',
            'StrictMode',
            'createFactory',
            'createRef',
            'createContext',
            'isValidElement',
            'isValidElementType',
          ],
        },
      }),
      production && terser(),
    ],
  },
  {
    input: 'test/index.tsx',
    output: {
      file: 'dist/react-modalized.test.js',
      format: 'iife',
      sourcemap: true,
    },
    external: [
      'React', 'ReactDOM',
      // ...Object.keys(pkg.dependencies),
      // ...Object.keys(pkg.devDependencies),
      // ...Object.keys(pkg.peerDependencies),
    ],
    plugins: [
      replace({'process.env.NODE_ENV': JSON.stringify('production')}),
      typescript(),
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),
		  commonjs({
        include: [
          'node_modules/**',
        ],
        exclude: [
          'node_modules/process-es6/**',
        ],
        namedExports: {
          'node_modules/react/index.js': [
            'Children',
            'Component',
            'PureComponent',
            'PropTypes',
            'createElement',
            'Fragment',
            'cloneElement',
            'StrictMode',
            'createFactory',
            'createRef',
            'createContext',
            'isValidElement',
            'isValidElementType',
          ],
        },
      }),
    ],
  },
]