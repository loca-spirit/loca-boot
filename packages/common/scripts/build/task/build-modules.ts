import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import path from 'path'
import { rollup } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { compRoot, outputCjs, outputEsm, projectTsconfig, root, srcRoot } from '../utils/paths'
import { generateExternal, generatePaths, target } from '../utils/rollup'

export const buildModules = async () => {
  const input = [
    // root
    path.resolve(compRoot, 'index.ts'),
  ]

  const bundle = await rollup({
    input,
    plugins: [
      typescript({
        tsconfig: projectTsconfig,
        compilerOptions: {
          outDir: outputCjs,
          baseUrl: root,
          rootDir: srcRoot,
          declaration: true,
        },
      }),
      // babel({
      //   babelHelpers: 'bundled',
      //   presets: [
      //     [
      //       '@babel/preset-env',
      //       {
      //         targets: {
      //           ie: '11', // 目标为 IE11
      //         },
      //         useBuiltIns: 'usage', // 自动引入
      //         corejs: 3, // 指定 core-js 版本
      //       },
      //     ],
      //   ],
      //   extensions: ['.js', '.ts'], // 处理 JS 和 TS 文件
      //   exclude: /node_modules\/(?!your-es6-dependency)/, // 保留特定依赖的转换
      // }),
      esbuild({
        target,
        sourceMap: true,
      }),
    ],
    treeshake: false,
    external: await generateExternal({ full: true }),
  })

  await Promise.all([
    // bundle.write({
    //   format: 'esm',
    //   dir: outputEsm,
    //   exports: undefined,
    //   preserveModules: true,
    //   preserveModulesRoot: 'src',
    //   sourcemap: true,
    //   entryFileNames: `[name].mjs`,
    //   paths: generatePaths(true),
    // }),
    bundle.write({
      format: 'cjs',
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: `[name].js`,
      paths: generatePaths(false),
    }),
  ])
}
