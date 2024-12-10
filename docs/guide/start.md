---
permalink: /guide/start/
---
## 使用指南

### 安装Pow-Cli工具

::: tip
建议通过`npm`或`yarn`全局安装`pow-cli`工具，也可以通过git手动下载模板源码。
:::


::: tabs

@tab npm

```bash
npm install loca-boot-core
```

@tab yarn

```bash
yarn global add loca-boot-core
```
:::



### 创建SDK项目

```bash
pow-cli create sdk
```
按照提示输入项目名称，等待项目创建完成。


### 添加子SDK包
在SDK项目根目录下执行以下命令，按照提示输入子SDK包名称，等待子SDK包创建完成。
```bash
pow-cli addSdk
```

### 启动项目文档
开发项目文档时，可以通过以下命令启动文档服务。
::: tip
建议项目开发node版本为`20.0.0`以上, 以及 `yarn`版本为`4.0.0`以上。 <br/><br/>
推荐版本：`node v20.9.0`，`yarn 4.3.1`
:::

:::tabs

@tab npm

```bash
npm run dev
```

@tab yarn

```bash
yarn dev
```
:::
通过以上命令，会执行 `vuepress dev docs`命令，启动文档服务。


### 文档打包
项目文档开发完成后，可以通过以下命令打包文档。
::: tabs
@tab npm

```bash
npm run build:doc
```

@tab yarn

```bash
yarn build:doc
```

:::
通过上述命令，文档代码会被打包到根目录下的`dist`目录下。

### SDK源码打包
项目开发完成后，可以通过以下命令打包SDK源码。
::: tabs
@tab npm

```bash
npm run build:lib
```

@tab yarn

```bash
yarn build:lib
```

:::
通过上述命令，每个SDK子包的源码会被分别打包到其根路径下的`dist`、`es`，`lib`目录下。<br/><br/>
其中，`dist`目录下的代码为`esm`和`umd`规范的代码，`es`目录下的代码为`esm`规范的代码，`lib`目录下的代码为`cjs`规范的代码。


### SDK版本发布
SDK开发完成后，可以通过以下命令发布SDK版本。
::: tip
目前FX平台未适配Monorepo类型的SDK包发布，需要手动发包，发布SDK版本前，需要先在SDK子包`package.json`文件中配置`version`字段。
:::

::: tabs
@tab npm

```bash
npm pub
```

@tab yarn

```bash
yarn pub
```

:::
通过以上命令，可以基于lerna发布SDK版本。
