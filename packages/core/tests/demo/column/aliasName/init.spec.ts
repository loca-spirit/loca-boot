import { Consumer } from "./Consumer"

// region consumer
const consumer = new Consumer({
  user_age: '19',
  user_name: 'Luffy',
})
// endregion consumer

describe('aliasName', () => {

  it('自定义字段名', () => {
    expect(consumer.age).toBe('19') // PASS
    expect(consumer.name).toBe('Luffy') // PASS
  })

  it('output流向数据会使用自定义的key', () => {
    expect(consumer.getSerializableObject()).toEqual({ age: '19', name: 'Luffy' }) // PASS
  })
})

// region log
console.log(consumer.age)
// ‘19’

console.log(consumer.name)
// 'Luffy'

console.log(consumer.getSerializableObject())
// { age: '19', name: 'Luffy' }
//endregion log