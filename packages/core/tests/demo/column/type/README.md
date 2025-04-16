---
permalink: /column/type/
---

# type 类型

## 说明

对象属性字段的类型，声明类型是为了静态代码检查

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

### 打印日志

```ts :no-line-numbers
<!-- @include: ./init.spec.ts#log -->
```

:::

## 注意事项

- <span style="color:red">不需要传入，但是要正确的声明</span>，通过 Reflect.getMetadata('design:type', target, property)自动读取
- 支持的数据类型**Array**、**Object**、**Number**、**String**、**Boolean**、**Map**、**WeakMap**、**Set**、**WeakSet**、**Symbol**、**Function**、**File**、**Any**
- **Array**、**Object**的特殊用法请参考 [`model`](/column/model/README.md)
