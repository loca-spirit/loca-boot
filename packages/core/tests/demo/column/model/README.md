---
permalink: /column/model/
---

# model 模型

## 说明

递归生成复杂对象的时候所需要，非必传，但是 **Array** 和 **Object** 需要传入 `model`

## 案例

::: tabs

@tab 数组模型

模型

```ts :no-line-numbers
<!-- @include: ./arr.spec.ts#model -->
```

实例初始化

```ts :no-line-numbers
<!-- @include: ./arr.spec.ts#instance -->
```

打印日志

```ts :no-line-numbers
<!-- @include: ./arr.spec.ts#log -->
```

@tab 对象模型

### 模型

```ts :no-line-numbers
<!-- @include: ./obj.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./obj.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./obj.spec.ts#log -->
```

@tab 未传 model

### 模型

```ts :no-line-numbers
<!-- @include: ./diff.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./diff.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./diff.spec.ts#log -->
```

:::

## 注意事项

- 普通类型无需传入 `model` ,只有 **Array** 和 **Object** 需要传入 `model`
- 若没有传入 `model` 字段
  - 不可以调用 **ModelBase** 原型的所有方法
  - 对于 **Array** 来说，字段为下划线命名
  - 对于 **Object** 来说
    - 如果内层类型在外层类型上面定义，会转换为驼峰命名
    - 若在下面定义，则为下划线命名
