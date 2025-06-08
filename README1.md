# loca

## init

```bash
yarn

# 高版本暂时会导致发包失败，这个版本目前比较稳定。
yarn global add lerna@3.22.1
```

## 打包

```bash
# build
yarn pkgs boot
# publish
yarn pub boot
# 更新版本号
yarn v boot 
```

# ModelBase

## Links

- [What is ModelBase](#what-is-model-base)
- [Installation](#installation)
- [Methods](#methods)
    - [createModel](#createModel)

### What is ModelBase
#### 设计初衷
ModelBase诞生于2017年，是一个被后端团队不断锤炼出来的一个小工具，目标是想一行代码来解决前端处理数据的痛苦的方式。
##### 痛苦点
- 前端需要将后端接口数据的key递归转换为驼峰命名的key。
- 代码的静态类型检查的需求，interface和class的取舍，我们因为要复用模型，所以采用了class。
- 因为vue2的特殊机制，如果我们不提前定义好对象的key，那么这个对象是无法进行响应式的，我们如果提前定义好key，也要重复写大量的对象。
- 我们提交数据的时候有的时候需要全量提交，但是又有很多场景都是增量提交（包括变化提交，增 了什么，删了什么，改了什么），而且类似空字符、null不允许提交。

等等，这些痛点促成了`ModelBase`的诞生。

#### 基本概念

- `ModelBase`实例
    - 指的是自定义class继承`ModelBase`后，通过new创建的实例，该实例具有ModelBase原型所有的方法。
- `input流向数据`（后端给前端的数据）
    - 一般指后端返回给前端的数据，在`ModelBase`里面指的是new `ModelBase`(input)。
- `output流向数据`（前端给后端的数据）
    - 一般指的是前端提交给后端，在`ModelBase`里面指的是调用`getChangedData`、`getSerializableObject`、`getSerializableStr`、
  `getCleanSerializableObject`、`getCleanSerializableString`、`getChangedDescriptor`等方法获取的数据。

### createModel

`createModel`方法会自动将普通的JSON对象变为`Consumer` 的class实例对象。

`createModel`会校验JSON数据的key必须和`Consumer`的可以保持一致，默认同时支持驼峰和下划线的key。

```typescript
import { createModel } from '@model-base/core'
import { Consumer } from './model/Consumer'

const model = createModel(Consumer,
  {
    id: 1,
    userName: 'mengyubo',
  },
)
expect(model.id).toBe(1)
expect(model.userName).toBe('mengyubo')
```
