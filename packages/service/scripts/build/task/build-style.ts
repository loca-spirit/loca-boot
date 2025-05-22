import { dest, src } from 'gulp'
import path from 'path'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import concat from 'gulp-concat'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { srcRoot, output, outputEsm, outputCjs, root } from '../utils/paths'
import { generatePaths } from '../utils/rollup'

/**
 * [src/*.scss] to [es/*.scss, lib/*.scss]
 */
const buildScssCopy = async () => {
  await new Promise((resolve) => {
    src(`${srcRoot}/**/*.scss`)
      .pipe(dest(outputEsm))
      .pipe(dest(outputCjs))
      .on('end', resolve)
  })
}

/**
 * [src/**\/style/*.scss] to [es/**\/style/*.css, lib/**\/style/*.css]
 */
const buildScssModules = async () => {
  const sass = gulpSass(dartSass)
  await new Promise((resolve) => {
    src(`${srcRoot}/**/style/*.scss`)
      .pipe(sass.sync())
      .pipe(autoprefixer({ cascade: false }))
      .pipe(cleanCSS())
      .pipe(dest(outputEsm))
      .pipe(dest(outputCjs))
      .on('end', resolve)
  })
}

/**
 * [src/*.scss] to [dist/*.css]
 */
const buildScssFull = async () => {
  const sass = gulpSass(dartSass)
  await new Promise((resolve) => {
    src(`${srcRoot}/*.scss`)
      .pipe(sass.sync())
      .pipe(autoprefixer({ cascade: false }))
      .pipe(cleanCSS())
      .pipe(dest(output))
      .on('end', resolve)
  })
}

/**
 * [src/**\/style/*.ts] to [es/**\/style/*.js, lib/**\/style/*.js]
 */
const buildStyleModules = async () => {
  const input = [
    // style
    ...(await glob(`${srcRoot}/**/style/*.ts`)),
    // resolver
    path.resolve(srcRoot, 'resolver.ts'),
  ]

  const bundle = await rollup({
    input,
    plugins: [
      esbuild({
        sourceMap: true,
      }),
    ],
    external: [/./],
    treeshake: false,
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: outputEsm,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].mjs`,
    }),
    bundle.write({
      format: 'cjs',
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].js`,
      paths: generatePaths(),
    }),
  ])
}

export const buildStyle = async () => {
  await Promise.all([
    buildScssCopy(),
    buildScssModules(),
    buildScssFull(),
    // buildStyleModules(),
  ])
}
