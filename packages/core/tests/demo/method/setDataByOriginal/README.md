---
permalink: /method/setDataByOriginal/
---

# setDataByOriginal 设置模型数据

## 说明

### setDataByOriginal 的参数

**setDataByOriginal(dto: any, options?: {keepBackUp?: boolean})**

- **dto**：input 数据，后端返回的数据
- **options**：可选
  - **keepBackUp**（或者叫 keepStatus 好一些）：如果为 true，则不会更新 saved 的状态。getChanged 方法可以获取到这些数据的变化。如果为 false，通过当前方法赋值后再调用 getChanged 会返回为{}，内部会调用 saveChangedData 方法

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

### 调用函数

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#fn -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#log -->
```

:::
