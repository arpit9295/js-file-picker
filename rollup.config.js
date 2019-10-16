import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import filesize from 'rollup-plugin-filesize';
import minify from 'rollup-plugin-babel-minify';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: 'src/index.js',
  external: ['lodash.debounce'],
  output: [
    {
      file: 'build/index.js',
      format: 'umd',
      name: 'js-pick-file',
      exports: 'named',
      globals: ['debounce'],
    },
    {
      file: 'build/index.cjs.js',
      format: 'cjs',
      name: 'js-pick-file',
      exports: 'named',
    },
    {
      file: 'build/index.esm.js',
      format: 'es',
    },
  ],
  plugins: [
    globals(),
    builtins(),
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true,
      modulesOnly: true,
    }),
    minify(),
    terser(),
    commonjs(),
    filesize(),
  ],
};

export default config;
