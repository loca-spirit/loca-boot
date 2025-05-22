---
permalink: /column/aliasName/
---

# aliasName 入参别名

## 说明

设置`入参`数据的属性别名。

## 案例

::: tabs

@tab 案例一

### 模型

```ts :no-line-numbers
<!-- @include: ./Consumer.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#consumer -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#log -->
```

:::

## 注意事项

- 需要把后端给的字段名作为 `aliasName` 的属性值，而不是把自定义字段名作为属性值
- 使用 `aliasName` 当我们数据给后端时也使用自定义的字段名，如果需要在接受后端数据和输出后端数据时字段名保持一致，请参考 [`name`](/column/name/README.md)
