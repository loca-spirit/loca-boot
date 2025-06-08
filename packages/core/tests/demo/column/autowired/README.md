---
permalink: /column/autowired/
---

# autowired 默认初始化

## 说明

是否自动注入初始化的值，适用于 **ModelBase** ，依赖 `model` 来进行自动初始化

## 案例

### 模型和实例

::: tabs

@tab 数组模型

### 模型

```ts :no-line-numbers
<!-- @include: ./array.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./array.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./array.spec.ts#log -->
```

@tab 对象模型

### 模型

```ts :no-line-numbers
<!-- @include: ./object.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./object.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./object.spec.ts#log -->
```

@tab 普通类型模型

### 模型

```ts :no-line-numbers
<!-- @include: ./primitive.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./primitive.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./primitive.spec.ts#log -->
```

:::

## 注意事项

- `autowired` 无法用于普通类型初始化
- 普通类型初始化若需初始化请参考 [`default`](/column/default/README.md)
