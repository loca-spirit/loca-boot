---
permalink: /guide/changelog/
---
## 更新日志

[//]: # 'template'
[//]: # '## 1.1.2'
[//]: # '#### Feature'
[//]: # '#### Fix'
[//]: # '#### Style'
[//]: # '#### Breaking Change'
[//]: # '#### Remove'

## 1.73.14

#### Feature
** loca-boot-core **
- 标准化Column内部的参数，增加serialize和deserialize，对应之前的unformatter和formatter
- 标准化模型的传入：所有之前的childType传入的class，统一使用 model: () => User的函数形式返回。不管Column装饰器修饰属性是数组对象，都的制定model，这个变更的修改提供pow-cli进行自动化修正。
** loca-boot-service **
- 增加beforeDeserialize和afterDeserialize

## 1.73.13

#### Feature
** loca-boot-core **
- 提升性能
- 修复存在多个版本的loca-boot-core时，无法判断是否是ModelBase类型的bug。
- 优化createModel嵌套类型校验问题：createModel(UserModel, dto)，对dto类型校验更准确。
- 支持非new模式的创建：new UserModel(dto) => UserModel.create(dto)函数，create函数不会校验dto类型，主要是为了适配服务端环境deno，demo不支持在构造函数里面进行赋值。
- 支持lodash的clone函数（clone会保留class的原型链），克隆ModelBase的实例对象推荐用lodash。
