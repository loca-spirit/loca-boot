---
permalink: /column/default/
---

# default 默认值

## 说明

创建对象时候属性的默认值，基本类型用 `default` ，复杂类型用 `autowired` 或者函数

## 案例

::: tabs

@tab 普通类型模型

### 模型

```ts :no-line-numbers
<!-- @include: ./primitive.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./primitive.spec.ts#instance -->
```

### 修改实例

```ts :no-line-numbers
<!-- @include: ./primitive.spec.ts#change -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./primitive.spec.ts#log -->
```

@tab 数组和对象模型

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

@tab 默认值为函数类型

### 模型

```ts :no-line-numbers
<!-- @include: ./fn.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./fn.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./fn.spec.ts#log -->
```

:::

## 注意事项

- `default` 推荐用于普通类型
- 如果需要给 **Array** 或者 **Object** 进行初始化，请参考 [`autowired`](/column/autowired/README.md)
- 如果初始化时需要给 **Array** 或者 **Object** 更详细的默认值，请参考<span style="color:red">案例三</span>
