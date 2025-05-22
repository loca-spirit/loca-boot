---
permalink: /column/unformatter/
---

# unformatter 反格式化

## 说明

input 流向数据格式化

## 案例

::: tabs

@tab 案例一

### 格式化函数

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#fn -->
```

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

## 注意事项

- `unformatter` 是将数据给后端时进行格式化
- 如果从后端拿数据时需要进行格式化，请参考 [`formatter`](/column/formatter/README.md)
