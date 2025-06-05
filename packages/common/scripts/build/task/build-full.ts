import path from 'path'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { compRoot, output } from '../utils/paths'
import { target, generateExternal } from '../utils/rollup'
import { PKG_CAMELCASE_NAME } from '../utils/constants'

const build = async (minify: boolean) => {
  const input = [
    // root
    path.resolve(compRoot, 'index.ts'),
  ]

  const bundle = await rollup({
    input,
    plugins: [
      nodeResolve(),
      commonjs({
      }),
      json(),
      esbuild({
        target,
        sourceMap: minify,
        treeShaking: true,
      }),
      minify
        ? minifyPlugin({
            target,
            sourceMap: minify,
          })
        : null,
    ],
    treeshake: true,
    external: await generateExternal({ full: false }),
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      file: path.resolve(output, `index${minify ? '.min' : ''}.mjs`),
      exports: undefined,
      sourcemap: minify,
    }),
    bundle.write({
      format: 'umd',
      file: path.resolve(output, `index${minify ? '.min' : ''}.js`),
      exports: 'named',
      sourcemap: minify,
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue',
      },
    }),
  ])
}

export const buildDev = () => build(false)

export const buildFull = async () => {
  await Promise.all([build(false), build(true)])
}
