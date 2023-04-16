import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import ts from '@rollup/plugin-typescript';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';
import { visualizer } from 'rollup-plugin-visualizer';
import cleanup from 'rollup-plugin-cleanup';
import { copyFile } from 'fs/promises';
import typescript from 'typescript';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

// import pkg from './package.json';

const copyPlugin = ({ paths, dir }) => ({
  name: 'copy-plugin',
  buildEnd (error) {
    if (!error) {
      try {
        paths.forEach((path) => copyFile(resolve('./', path), dir))
      } catch (error) {
        throw new Error(error);
      }
    };
  },
});

const production = !process.env.ROLLUP_WATCH

const commonPlugins = [
  replace({'process.env.NODE_ENV': JSON.stringify('production')}),
  ts({
    typescript,
    tsconfig: './tsconfig.json',
    sourceMap: true,
  }),
  nodeResolve(),
  progress(),
  commonjs({
    include: ['node_modules/**'],
    exclude: ['node_modules/process-es6/**'],
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
        'useCallback',
        'useMemo',
        'useContext',
        'Suspense',
        'useState',
        'useEffect',
        'useRef',
        'lazy',
        'memo',
      ],
    },
  }),
];

const buildLibConfig = {
  input: 'lib/index.ts',
  output: {
    name: 'dist/react-modalized',
    dir: 'dist',
    format: 'umd',
    globals: ['react'],
  },
  external: ['React', 'ReactDOM'],
  plugins: [
    ...commonPlugins,
    cleanup(),
    production && visualizer({
      filename: 'dist/stats.html',
      // template: 'network',
    }),
    production && terser(),
  ],
};

const buildExamplesConfig = {
  input: 'examples/index.tsx',
  output: {
    name: 'dist/react-modalized-example',
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
  },
  external: ['React', 'ReactDOM'],
  plugins: [
    ...commonPlugins,
    serve({
      verbose: true,
      contentBase: ["dist"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: ['examples', 'lib'] }),
    copyPlugin({ paths: ['examples/public/index.html'], dir: 'dist/index.html' })
  ]
};

export default [
  buildLibConfig,
  buildExamplesConfig,
]