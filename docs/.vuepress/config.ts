import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import hopeTheme from './theme'
import codeBlockPlugin from './plugin-code-block/src/node'

export default defineUserConfig({
  title: 'ModelBase',
  description: 'ModelBase是一个被后端团队不断锤炼出来的一个小工具，目标是想一行代码来解决前端处理数据的痛苦的方式',
  // base: (process.env.FX_BASE || '/') as any,
  base: '/' as any,
  port: 8080,
  theme: hopeTheme,
  plugins: [codeBlockPlugin],
  pagePatterns: [
    '**/*.md',
    '!.vuepress',
    '!node_modules',
    '../packages/**/tests/**/*.md',
    '../README.md',
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  bundler: viteBundler({
    viteOptions: {
      configFile: false,
      plugins: [
        // @ts-ignore
        vueJsx(),
      ],
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ['legacy-js-api'],
          },
        },
      },
      resolve: {
        alias: [],
      },
    },
  }),
})
