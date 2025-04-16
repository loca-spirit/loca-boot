---
permalink: /method/isContainsModel/
---

# isContainsModel 是否包含其他模型

## 说明

### isContainsModel 的参数

**isModelEqual(targetData: ModelBase, params?: { ignoreEmptyString?: boolean })**

- **targeData**：比较的目标对象。
- **params**：可选
  - **ignoreEmptyString**：如果设置 true 并且当前值和目标值存在 undefined 的情况下，会视为''和 undefined 为相等。

### 遍历范围

当前对象通过 **@Column** 声明的字段

### 算法说明

比较两个对象是否是包含关系，算法说明：

- 如果目标值为 undefined，则认为是包含关系。
- 如果目标值不为 undefined，但是和原来的值不相等，则认为是不包含（一般常见于同一个模型的不同实例）

### 使用场景

远程配置页面下发配置后，判断服务端返回的数据是否符合期待，如果返回的值和其他的值不一样，肯定是一个不包含行为。

## 案例

::: tabs

@tab 案例一
包含模型

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

@tab 案例二
如果目标值为 undefined，则认为是包含关系。

### 模型

```ts :no-line-numbers
<!-- @include: ./undefined.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./undefined.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./undefined.spec.ts#log -->
```

@tab 案例三
如果目标值不为 undefined，但是和原来的值不相等，则认为是不包含（一般常见于同一个模型的不同实例）

### 模型

```ts :no-line-numbers
<!-- @include: ./equal.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./equal.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./equal.spec.ts#log -->
```

:::
