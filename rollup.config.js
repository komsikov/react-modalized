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

const production = process.env.NODE_ENV === 'production'
const buildType = process.env.ROLLUP_BUILD

const commonPlugins = [
  cleanup(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
  }),
  commonjs(),
  nodeResolve(),
  progress(),
  json,
  ts({
    typescript,
    tsconfig: `./tsconfig.${buildType}.json`,
    sourceMap: !production,
  }),
];

const buildLibCjsConfig = {
  input: 'lib/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: !production,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: !production,
    },
    {
      name: 'ReactModalized',
      file: 'dist/index.umd.js',
      format: 'umd',
      sourcemap: !production,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    ...commonPlugins,
    !production && visualizer({
      filename: 'dist/stats.html',
      template: 'treemap',
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
    livereload(),
    copyPlugin({
      paths: [
        'examples/classExample/class.html',
        'examples/hookExample/hook.html',
        'examples/index.html',
      ],
      dir: 'dist',
    })
  ]
};

const configs = [];

if (buildType === 'lib') {
  configs.push(buildLibCjsConfig);
}

if (buildType === 'examples') {
  configs.push(buildExamplesConfig);
}

export default configs;