---
permalink: /method/saveChangedData/
---

# saveChangeData 保存变化的数据

## 说明

### 作用

将变化清空，下次调用 isChanged 返回值是 false。调用 getChangedData 返回是{}

### 使用场景

初始化有一些数据是通过异步获取的，但是这些数据不想被 getChangedData 拿到

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

### 修改实例

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#change -->
```

### 调用函数

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#fn -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#log -->
```

:::
