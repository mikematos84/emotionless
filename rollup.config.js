/* eslint-disable import/no-relative-packages */
/* eslint-disable import/no-extraneous-dependencies */
import fg from 'fast-glob';
import fs from 'fs-extra';

import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import path from 'path';
import { swc } from 'rollup-plugin-swc3';

// https://github.com/elbywan/wretch/issues/82
const THIS_IS_UNDEFINED = 'THIS_IS_UNDEFINED';

const swcrc = fs.readJSONSync(`${__dirname}/.swcrc`);

export default async function () {
  const pkg = await fs.readJSONSync('./package.json');
  const [index] = await fg.sync(['src/index.+(js|ts)']);
  return {
    input: { index },

    output: [
      {
        dir: 'dist/cjs',
        exports: 'named',
        format: 'cjs'
      },
      {
        dir: 'dist/es',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    ],

    onwarn: function ({ loc, code }) {
      if (code === THIS_IS_UNDEFINED && loc?.file.match('wretch')) {
        // eslint-disable-next-line no-useless-return
        return;
      }
    },

    external: pkg
      ? [
          ...Object.keys(pkg?.peerDependencies || {}),
          ...Object.keys(pkg?.devDependencies || {})
        ]
      : [],

    plugins: [
      resolve({
        extensions: ['.js', '.jsx']
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        )
      }),
      alias({
        entries: [
          {
            find: /^@\/(.*)$/,
            replacement: path.resolve('./src/$1')
          }
        ]
      }),
      process.env?.TRANSPILER === 'swc'
        ? swc({
            jsc: { ...swcrc.jsc }
          })
        : babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            presets: ['@babel/env', '@babel/preset-react'],
            extensions: ['.js', '.jsx']
          }),
      json(),
      commonjs(),
      url(),
      svgr()
    ]
  };
}
