---
permalink: /method/isChanged/
---

# isChanged 模型是否变化

## 说明

### 作用

- 当前对象是否发生变更
- 目前是通过变量当前对象的所有 key 对应的值来对比，复杂对象通过 stringfy 去简单对比

### 遍历范围

当前对象通过 **@Column** 声明的字段

## 案例

::: tabs

@tab 案例一
返回 **boolean** 值

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
判断当前对象通过 **@Column** 声明的字段是否变化

### 模型

```ts :no-line-numbers
<!-- @include: ./noColumn.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./noColumn.spec.ts#instance -->
```

### 修改实例

```ts :no-line-numbers
<!-- @include: ./noColumn.spec.ts#change -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./noColumn.spec.ts#log -->
```

:::
