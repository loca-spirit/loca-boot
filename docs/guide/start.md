---
permalink: /guide/start/
---
## 快速上手

### tsconfig.json配置

```bash
"compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false,
}
```

### 引入`loca-boot-core`，并定义模型

```ts
import { Column, ModelBase } from 'loca-boot-core'

export class Consumer extends ModelBase {
  @Column()
  public age?: string

  @Column()
  public name?: string
}

```
### 实例化

```ts
const consumer = new Consumer({
  age: '19',
  name: 'Luffy',
})

```
### 获取数据

```ts
consumer.getSerializableObject()
// 输出
{ age: '19', name: 'Luffy' }

```
