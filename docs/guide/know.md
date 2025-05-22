---
permalink: /guide/know/
---
## 基本概念

### 基本概念介绍
- ModelBase实例
  - 指的是自定义class继承ModelBase后，通过new创建的实例，该实例具有ModelBase原型所有的方法。
- 入参（class的构造参数）
  - 一般指后端返回给前端的json，在ModelBase里面指的是new ModelBase(json)，将json转成class对象。
- 出参（实例化class转换的json）
  - 一般指的是前端提交给后端的json，在ModelBase里面可以通过调用getChangedData、getSerializableObject、getCleanSerializableObject、getChangedDescriptor等方法将class对象转成json。

### 数据状态
目前只有一种状态，saved状态。我们简单理解它，currentData和oldData（saved状态的值）
- 实例创建后的class对象，currentData和oldData相等。
- 修改实例化的class对象，currentData和oldData会产生差异。
- 调用getChangedData()，获取currentData和oldData的差异。
- 调用saveChangedData()，抹平currentData和oldData的差异。


