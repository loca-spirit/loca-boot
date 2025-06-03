import { Column, ModelBase } from 'loca-boot-core'
// region model
class TestItem extends ModelBase {
  @Column()
  public message?: string
}
class Test extends ModelBase {
  @Column({
    model: () => TestItem,
    default: () => [
      {
        message: 'msg1',
      },
    ],
  })
  public arr?: TestItem[]
  @Column({
    model: () => TestItem,
    default: () => ({
      message: 'msg2',
    }),
  })
  public obj?: TestItem
}
//endregion model

// region instance
const test = new Test()
// endregion instance

describe('default', () => {
  it('default用于复杂类型还可以写函数', () => {
    expect(test.arr).toEqual([{ message: 'msg1' }]) // PASS
    expect(test.obj).toEqual({ message: 'msg2' }) // PASS
  })
})
// region log
console.log(test.arr)
// [{ message: "msg1" }]

console.log(test.obj)
// { message: "msg2" }
// endregion log
