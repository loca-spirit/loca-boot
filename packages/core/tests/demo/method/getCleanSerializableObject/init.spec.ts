import { Column, ModelBase } from '@model-base/core'
// region model
class Test extends ModelBase {
  @Column()
  public str?: string
  @Column()
  public emptyStr?: string
  @Column({})
  public arr?: any[]
  @Column({})
  public emptyArr?: any[]
}
// endregion model

// region instance
const test = new Test({
  str: 'str',
  emptyStr: '',
  arr: [123, '', [], {}],
  emptyArr: [],
})
// endregion instance

describe('getCleanSerializableObject', () => {
  it('getCleanSerializableObject()', () => {
    expect(test.getCleanSerializableObject()).toEqual({
      str: 'str',
      arr: [123, '', [], {}],
    }) // PASS
  })
})

// region log
console.log(test.getCleanSerializableObject())
// { str: "str", arr: [123, "", [], {}] }
// endregion log
