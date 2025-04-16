---
permalink: /column/primary/
---

# primary 主键

## 说明

调用**getChangedDescriptor**的时候才需要设置的属性  
一般用于数组类型的字段上，用于两个对象的比较，根据 `primary` 来判断当前的数据状态是新增，修改还是删除

## 案例

::: tabs

@tab 案例一

### 模型

```ts :no-line-numbers
<!-- @include: ./init.ts#model -->
```

### 实例初始化

```ts :no-line-numbers
<!-- @include: ./init.ts#instance -->
```

### 修改实例

```ts :no-line-numbers
<!-- @include: ./init.ts#change -->
```

### 打印日志

```ts :no-line-numbers
<!-- @include: ./init.ts#log -->
```

:::

![本地图片](./image.png)

## 注意事项

#### getChangedDescriptor()的输出格式

- **key**（实例化属性的 key）
  - **dataKey**
    - 变化属性的 output 流向数据的 key
  - **currentValue**
    - 最新值
  - **oldValue**
    - 旧值
  - **changeDescriptor**
    - 变化的数据的描述，包括 create、update、delete
  - **action**
    - UPDATE、CREATE、DELETE
