---
permalink: /method/isModelEqual/
---

# isModelEqual 是否和其他模型等效

## 说明

### isModelEqual 的参数

**isModelEqual(targetData: ModelBase, params?: { ignoreEmptyString?: boolean })**

- **targeData**：比较的目标对象。
- **params**：可选
  - **ignoreEmptyString**：如果设置 true 并且当前值和目标值存在 undefined 的情况下，会视为''和 undefined 为相等。

### 遍历范围

当前对象通过 **@Column** 声明的字段

## 案例

::: tabs

@tab 案例一
比较两个实例化的对象是否相等（一般常见于同一个模型的不同实例）

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
