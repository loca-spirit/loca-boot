---
permalink: /column/name/
---

# name 字段编码

## 说明

name 影响的是入参字段和出参字段编码。

::: info 入参

如果想要支持多个入参映射到同一个出参 `aliasName` 来实现。

```ts
@Column({ aliasName: "user_age" })
public age?: string
```

默认出参编码是 name 是`age`，同时接受`age`（优先级最高）和`user_age`的传入。
:::

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

### 注意事项

- 要把后端给的字段名作为 `name` 的属性值，而不是把自定义字段名作为属性值
- `name` 配置能让接受数据和输出数据时使用的字段名保持一致，只有在前端操作的时候使用自定义的字段名
- 若接受数据和输出数据时使用的字段名不一致，请参考 [`aliasName`](/column/aliasName/README.md)

## 测试

::: playground#ts 输出 name

@file test.ts

<!-- ```ts
<!-- @include: ./init.spec.ts{1-1} -->
<!-- @include: ./init.spec.ts#model -->
<!-- @include: ./init.spec.ts#instance -->
<!-- @include: ./init.spec.ts#log -->
``` -->

```ts
console.log(123)
```

:::
