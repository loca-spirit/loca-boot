---
permalink: /method/getOriginalData/
---

# getOriginalData 获得对象被更改前的原始数据

## 说明

### 作用

获取调用过 saveChangedData 的数据或者初始化的 input 流向数据

### 遍历范围

当前对象通过@Column 声明的字段

## 案例

::: tabs

@tab 案例一
获取对象通过@Column 声明的字段

### 模型

```ts :no-line-numbers
<!-- @include: ./noColumn.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./noColumn.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./noColumn.spec.ts#log -->
```

@tab 案例二
获取调用过 saveChangedData 的数据或者初始化的 input 流向数据

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
