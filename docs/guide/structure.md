---
permalink: /guide/structure/
---

SDK Template 由以下两部分组成：```Docs文档部分```和```SDK代码部分```。
<Badge text="项目结构演示" />

```shell:no-line-numbers
.
├── docs           <--- SDK文档部分
│   ├── README.md  <--- SDK文档首页
│   └── guide
├── packages       <--- SDK代码部分
│   ├── __sdk-lib-template-tools__
│   ├── sdk-lib-template1
│   │   ├── es
│   │   ├── lib
│   │   ├── scripts
│   │   ├── src
├── fx.json
├── lerna.json
```



## 文档部分 docs
docs目录下存放了SDK的文档部分，包括 .vuepress、README.md、guide目录等。其中README.md是文档首页，guide目录下存放了SDK的具体文档内容。
.vuepress目录下存放了Vuepress的配置文件，包括config.js、styles、public等。

```md:no-line-numbers
.
├── .vuepress
│   ├── client-iframe.ts
│   ├── client.ts <--- 客户端配置文件
│   ├── config.ts <--- 配置文件
│   ├── theme.ts <--- 主题配置
│   ├── configs
│   │   ├── navbar
│   │   ├── sidebar
│   │   └── styles
│   ├── plugins
│   └── tsconfig.json
├── README.md
└── guide
```

### README.md
README.md是文档首页，用于展示SDK的基本信息，包括SDK的名称、描述、快速上手等。

### guide
guide目录下存放了SDK的具体文档内容，包括安装、使用、API等。

### .vuepress
.vuepress目录下存放了Vuepress的配置文件，包括主配置config.ts、 客户端配置client.ts、导航配置config、插件配置plugin等。

### config.ts
路径： ```docs/.vuepress/config.ts```<br/>
config.ts是Vuepress的主配置文件，可以配置文档站点的baseUrl、标题、描述、主题、导航栏、侧边栏以及打包方式等。具体配置项可以参考[Vuepress 官网文档](https://v2.vuepress.vuejs.org/zh/reference/config.html)。

```ts:no-line-numbers
import { viteBundler } from '@vuepress/bundler-vite'
import hopeTheme from './theme'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'SDK Template',
  description: '基于Mono-Repo的SDK模板',
  base: (process.env.FX_BASE || '/') as any,
  port: 8080,
  bundler: viteBundler(), // 使用 Vite 打包
  theme: hopeTheme, // 使用hope主题
})
```

### client.ts
路径： ```docs/.vuepress/client.ts```<br/>
client.ts是Vuepress的客户端配置文件，可以增加文档站点的客户端功能，注册 Vue 组件，提供全局方法等。具体配置项可以参考[Vuepress 客户端配置](https://v2.vuepress.vuejs.org/zh/reference/client-api.html)。

```ts:no-line-numbers
import { defineClientConfig } from 'vuepress/client'
import MyComponent from './components/MyComponent.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('MyComponent', MyComponent)
  },
  setup() {},
  rootComponents: [],
})
```

### configs
configs目录下存放了Vuepress的配置文件，包括导航栏navbar、侧边栏sidebar、样式styles等。我们使用了 Vuepress 的默认主题并提供了基础配置，开发者只需在sidebar配置文件中补充所需的导航页面即可。

``` ts:no-line-numbers title="sidebar.ts"
import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/': [
    {
      text: '开发指南',
      link: '/guide/start/',
      children: [
        {
          text: '快速上手',
          link: '/guide/start/',
        },
        {
          text: '国际化',
          link: '/guide/i18n/',
        },
        {
          text: '项目结构',
          link: '/guide/structure/',
        }
      ],
    },
  ],
}

```
## SDK代码部分 packages

packages目录下存放了SDK的代码部分，包括SDK包的通用工具、源码、打包配置等。

```shell:no-line-numbers
.
├── __sdk-lib-template-tools__  <--- sdk工具方法
│   ├── scripts
│   │   ├── index.ts
│   │   └── zip-files <--- 压缩脚本 
│   └── src
│       ├── index.scss
│       └── index.ts
├── sdk-lib-template1
│   ├── dist    <--- 全量打包后的文件，包括es、umd类型的文件
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── index.min.js
│   │   ├── index.min.js.map
│   │   ├── index.min.mjs
│   │   ├── index.min.mjs.map
│   │   └── index.mjs
│   ├── es  <--- es模块
│   │   ├── index.d.ts
│   │   ├── index.mjs
│   │   ├── index.mjs.map
│   │   └── index.scss
│   ├── lib <--- cjs模块
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── index.js.map
│   │   └── index.scss
│   ├── package.json
│   ├── scripts <--- 打包脚本
│   │   └── build
│   │       ├── index.ts
│   │       ├── task
│   │       │   ├── build-full.ts  <--- 全量打包
│   │       │   ├── build-modules.ts <--- 分模块打包
│   │       │   ├── build-style.ts <--- 打包样式
│   │       │   ├── clean.ts <--- 清理打包文件
│   │       │   ├── generate-types.ts <--- 生成.d.ts类型文件
│   │       │   └── index.ts
│   │       └── utils
│   │           ├── commandArgv.ts
│   │           ├── constants.ts <--- 常量
│   │           ├── paths.ts  <--- 根路径、SDK子包路径、打包文件路径
│   │           └── rollup.ts <--- rollup配置、路径替换方法等
│   ├── src <--- SDK源码
│   │   ├── index.scss
│   │   └── index.ts <--- SDK入口文件
│   └── tsconfig.declaration.json
```
### __sdk-lib-template-tools__
__sdk-lib-template-tools__目录下存放了SDK的通用工具方法，包括压缩脚本等

### sdk-lib-templateXXX
该目录下存放SDK的源码、打包配置、打包后的文件等

#### dist
路径： ```packages/sdk-lib-templateXXX/dist```<br/>
dist目录下存放了SDK的全量打包后的文件，包括es、umd类型的文件

#### es
路径： ```packages/sdk-lib-templateXXX/es```<br/>
es目录下存放了SDK的es模块，包括.d.ts、mjs、scss等文件

#### lib
路径： ```packages/sdk-lib-templateXXX/lib```<br/>
lib目录下存放了SDK的cjs模块，包括.d.ts、js、scss等文件

#### scripts
路径： ```packages/sdk-lib-templateXXX/scripts```<br/>
scripts目录下存放了SDK的打包脚本与工具方法，包括打包方法、常量、路径、rollup配置等

#### task
路径： ```packages/sdk-lib-templateXXX/scripts/build/task```<br/>
task目录下存放了SDK的打包任务，包括全量打包、分模块打包、打包样式、清理打包文件、生成.d.ts类型文件等

#### build-full.ts
路径： ```packages/sdk-lib-templateXXX/scripts/build/task/build-full.ts```<br/>
build-full.ts是SDK的全量打包任务，打包生成dist文件夹，其中包括es、umd格式的代码以及样式代码

#### build-modules.ts
路径： ```packages/sdk-lib-templateXXX/scripts/build/task/build-modules.ts```<br/>
build-modules.ts是SDK的分模块打包任务，打包生成es、cjs格式的代码，分别存放在es、lib文件夹下

#### build-style.ts
路径： ```packages/sdk-lib-templateXXX/scripts/build/task/build-style.ts```<br/>
build-style.ts是SDK的样式打包方法

#### utils
路径： ```packages/sdk-lib-templateXXX/scripts/build/utils```<br/>
utils目录下存放了SDK的打包工具方法，包括命令行参数、常量、路径、rollup配置等

#### constants.ts
路径： ```packages/sdk-lib-templateXXX/scripts/build/utils/constants.ts```<br/>
constants.ts存放了SDK的常量

#### paths.ts
路径： ```packages/sdk-lib-templateXXX/scripts/build/utils/paths.ts```<br/>
paths.ts存放了SDK的路径常量，包括根路径、SDK子包路径、打包文件路径等

#### rollup.ts
路径： ```packages/sdk-lib-templateXXX/scripts/build/utils/rollup.ts```<br/>
rollup.ts存放了SDK的rollup配置，包括路径替换方法等