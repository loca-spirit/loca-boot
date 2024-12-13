---
permalink: /guide/start/
---
## 使用指南

### tsconfig.json配置

::: tip
建议通过`npm`或`yarn`全局安装`pow-cli`工具，也可以通过git手动下载模板源码。
:::

```bash
"compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false,
}
```

### 创建SDK项目

```bash
pow-cli create sdk
```
按照提示输入项目名称，等待项目创建完成。

