import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: 'json' };

const production = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.tsx',
  output: [
    { file: pkg.module, format: 'esm', sourcemap: !production },
    { file: pkg.main, format: 'cjs', sourcemap: !production },
  ],
  external: ['react', 'react-dom', 'moxie'],
  plugins: [
    cleanup(),
    commonjs(),
    nodeResolve(),
    ts({ tsconfig: './tsconfig.json' }),
    production && terser(),
  ].filter(Boolean)
}
