---
permalink: /method/update/
---

# update 更新数据

## 说明

### 作用

动态更新一些数据，入参是输入流向数据。

### update 的参数

**update(dto: any)**

- **dto**：input 数据，后端返回的数据。

### 使用场景

服务端 socket 通信后只是更新局部数据。没有经过大规模验证，慎用。

## 案例

::: tabs

@tab 案例一

### 模型

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#log -->
```

:::
