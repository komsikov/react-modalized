import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { basename, join } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';
import { visualizer } from 'rollup-plugin-visualizer';
import cleanup from 'rollup-plugin-cleanup';
import typescript from 'typescript';
import dotenv from 'dotenv';
import { mkdir } from 'fs/promises';

dotenv.config();

const copyPlugin = ({ paths, dir }) => ({
  name: 'copy-plugin',
  buildEnd (error) {
    if (error) {
      console.error(error);
      return;
    }
    
    paths.forEach(async (path) => {
      try {
        await mkdir(dir, { recursive: true });

        const rs = createReadStream(path);
        const ws = createWriteStream(join(dir, basename(path)));
        pipeline(rs, ws);
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    });
  },
});

const production = !process.env.ROLLUP_WATCH
const buildType = process.env.ROLLUP_BUILD

const commonPlugins = [
  cleanup(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
  }),
  nodeResolve(),
  progress(),
  json,
  ts({
    typescript,
    tsconfig: './tsconfig.json',
    sourceMap: true,
  }),
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
    name: 'react-modalized',
    dir: 'dist',
    format: 'umd',
    sourcemap: !production,
    globals: ['react'],
  },
  external: ['React', 'ReactDOM'],
  plugins: [
    ...commonPlugins,
    visualizer({
      filename: 'dist/stats.html',
      template: 'network',
    }),
    production && terser(),
  ],
};

const buildExamplesConfig = {
  input: {
    classExample: 'examples/classExample/index.tsx',
    hookExample: 'examples/hookExample/index.tsx',
  },
  output: {
    name: 'react-modalized',
    entryFileNames: '[name].js',
    dir: 'dist',
    format: 'esm',
    sourcemap: !production,
  },
  external: ['React', 'ReactDOM'],
  plugins: [
    ...commonPlugins,
    serve({
      verbose: true,
      contentBase: ['dist'],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: ['examples', 'lib', 'dist'] }),
    copyPlugin({
      paths: ['examples/classExample/class.html', 'examples/hookExample/hook.html'],
      dir: 'dist',
    })
  ]
};

const configs = [];

if (buildType === 'lib') {
  configs.push(buildLibConfig);
}

if (buildType === 'examples') {
  configs.push(buildExamplesConfig);
}

export default configs;