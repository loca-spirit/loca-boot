---
permalink: /guide/why/
---
## 使用指南

### ModelBase的初衷

一行代码来解决前端处理数据的痛苦。
- 后端接口给前端的数据都是下划线风格的，对于前端规范不兼容，前端需要将数据的key递归转换为驼峰命名的key。
- 代码的静态类型检查的需求，同一个属性被定义到好多地方，改完一个地方，造成的影响不可预知（主要是typescript的功劳，ModelBase也是基于typescript的）。
- 因为vue2的特殊机制，如果我们不提前定义好对象的key，那么这个对象是无法进行响应式的，造成页面无法更新，我们如果提前定义好key（一个模型可能有几十个key），需要大量的重复劳动。
- 我们提交数据的时候有的时候需要全量提交，但是又有很多场景都是增量提交（包括变化提交，增 了什么，删了什么，改了什么），而且类似空字符、null不允许提交。
那么ModelBase是如何用一行代码来优雅的解决这些问题的？

### 基本概念介绍
- ModelBase实例
  - 指的是自定义class继承ModelBase后，通过new创建的实例，该实例具有ModelBase原型所有的方法。
- init数据
  - 一般指后端返回给前端的数据，在ModelBase里面指的是new ModelBase(init)。
- output流向数据
  - 一般指的是前端提交给后端，在ModelBase里面指的是调用getChangedData、getSerializableObject、getSerializableStr、getCleanSerializableObject、getCleanSerializableString、getChangedDescriptor等方法获取的数据。
比较理想的状态是input和output的key是一模一样，他们和ModelBase的key的关系仅仅是下划线和驼峰的关系。

### 数据状态
目前只有一种状态，saved状态。我们简单理解它，currentData和oldData（saved状态的值）
- 实例创建后currentData和oldData相等。
- 修改currentData，会造成和oldData不相等。
- 调用saveChangedData()，currentData和oldData又相等。


