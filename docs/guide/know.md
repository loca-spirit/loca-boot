---
permalink: /guide/know/
---
## 认识ModelBase

### 基本概念介绍
- ModelBase实例
  - 指的是自定义class继承ModelBase后，通过new创建的实例，该实例具有ModelBase原型所有的方法。
- plainData数据（喂给模型input）
  - 一般指后端返回给前端的数据，在ModelBase里面指的是new ModelBase(plainData)。
- plainData数据（模型吐出output）
  - 一般指的是前端提交给后端，在ModelBase里面指的是调用getChangedData、getSerializableObject、getSerializableStr、getCleanSerializableObject、getCleanSerializableString、getChangedDescriptor等方法获取的数据。
比较理想的状态是input和output的key是一模一样，他们和ModelBase的key的关系仅仅是下划线和驼峰的关系。

### 数据状态
目前只有一种状态，saved状态。我们简单理解它，currentData和oldData（saved状态的值）
- 实例创建后currentData和oldData相等。
- 修改currentData，会造成和oldData不相等。
- 调用saveChangedData()，currentData和oldData又相等。


