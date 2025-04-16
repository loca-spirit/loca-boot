---
permalink: /column/group/
---

# group 分组

## 说明

声明当前的 column 属于哪个组，最后通过**getChangedData**、**getSerializableObject**方法来获取对应分组的内容

## 案例

::: tabs

@tab getChangedData

### 模型

```ts :no-line-numbers
<!-- @include: ./getChangedData.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./getChangedData.spec.ts#instance -->
```

### 修改实例

```ts :no-line-numbers
<!-- @include: ./getChangedData.spec.ts#change -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./getChangedData.spec.ts#log -->
```

@tab getSerializableObject

### 模型

```ts :no-line-numbers
<!-- @include: ./getSerializableObject.spec.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./getSerializableObject.spec.ts#instance -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./getSerializableObject.spec.ts#log -->
```

:::

## 注意事项

- **getSerializableObject**
  - **({ group: 'group1' })** 获得 column 中被标记为“group1”的属性与没有做任何 group 标记的属性的并集
  - **({ excludeGroup: 'group1' })** 获得 column 中没有被标记为“group1”的所有属性
  - **()** 获取所有属性
- **getChangedData**
  - **({ group: 'group1' })** 获得 column 中被标记为“group1”的属性与没有做任何 group 标记的属性的并集（变化的数据）
  - **({ excludeGroup: 'group1' })** 获得 column 中没有被标记为“group1”的所有属性（变化的数据）
  - **()** 获取所有属性（变化的数据）
