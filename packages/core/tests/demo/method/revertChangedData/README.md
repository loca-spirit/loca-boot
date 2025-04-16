---
permalink: /method/revertChangedData/
---

# revertChangedData 还原变化的数据

## 说明

### 作用

还原数据到上一次调用 **saveChangedData** 或者初始化状态。

## 案例

::: tabs

@tab 案例一
还原数据到初始化

### 模型

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#instance -->
```

### 修改实例

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#change -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#log -->
```

@tab 案例二
还原数据到上一次调用 **saveChangedData**

### 模型

```ts :no-line-numbers
<!-- @include: ./save.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./save.spec.ts#instance -->
```

### 修改实例

```ts :no-line-numbers
<!-- @include: ./save.spec.ts#change -->
```

### 调用函数

```ts :no-line-numbers
<!-- @include: ./save.spec.ts#fn -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./save.spec.ts#log -->
```

:::
