import { Column, ModelBase } from '@model-base/core'
// region model
class TestItem extends ModelBase {
  @Column()
  public str?: string
}
class Test extends ModelBase {
  @Column()
  public str?: string
  @Column({
    model: () => TestItem,
  })
  public arr?: TestItem[]
}
// endregion model

// region instance
const test1 = new Test({
  str: 'str',
  arr: ['1', '2', '3'],
})
const test2 = new TestItem(['1', '2', '3', '4', '5'])
// endregion instance

describe('isContainsModel', () => {
  it('isContainsModel()', () => {
    expect(test1.isContainsModel(test2)).toBe(true) // PASS
  })
})

// region log
console.log(test1.isContainsModel(test2))
// true
//endregion log
