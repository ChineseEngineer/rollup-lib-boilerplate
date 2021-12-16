import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import rm from 'rimraf'
import path from 'path'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'

const root = process.cwd()
const resolvePath = (p) => path.resolve(root, p)

/**
 * 每次编译删除dist目录
 */
rm(resolvePath('dist'), (err) => {
  if (err) throw err
})

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.js',
    output: {
      name: 'aiUtils',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      babel({
        exclude: 'node_modules/**', // 仅仅转译我们的源码
      }),
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser(), // 代码压缩
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/main.js',
    external: [],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser(), // 代码压缩
    ],
  },
]
