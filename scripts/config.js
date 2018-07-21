/* eslint import/no-extraneous-dependencies: 0 */

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const getPlugins = (env) => {
  const plugins = [resolve()]

  if (env) {
    plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
    )
  }

  plugins.push(
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          'env',
          {
            loose: true,
            modules: false,
            targets: {
              node: 'current',
              browser: '> 1%, last 2 versions',
            },
          },
        ],
        'stage-3',
      ],
      plugins: [
        ['transform-runtime', {
          helpers: false,
          polyfill: false,
          regenerator: true,
        }],
      ],
    }),
    commonjs({
      include: /node_modules/,
    }),
  )

  if (env === 'production')
    plugins.push(uglify({}, minify))

  return plugins
}

const config = {
  input: 'index.js',
  output: {
    globals: {
      react: 'React',
    },
  },
  external: ['react'],
  plugins: getPlugins(process.env.BUILD_ENV),
}

module.exports = config 