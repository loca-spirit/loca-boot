import { Column, ModelBase } from 'loca-boot-core'
// region model
class TestItem extends ModelBase {
  @Column()
  public userMsg!: any
}

class Test extends ModelBase {
  @Column({})
  public noModelArr!: TestItem[]
}
// endregion model

// region instance
const test = new Test({
  no_model_arr: [{ user_msg: 'arr' }],
})
// endregion instance

describe('model', () => {
  it('未传入model，值不会受影响', () => {
    expect(test.noModelArr).toEqual([{ user_msg: 'arr' }]) // PASS
  })
  it('未传入model，不可以调用ModelBase原型的所有方法', () => {
    expect(test.noModelArr[0].userMsg?.getChangeData()).toBe(undefined) // PASS
  })
})

// region log
console.log(test.noModelArr)
// [{ user_msg: 'arr' }]

// 未传入model，不可以调用ModelBase原型的所有方法
console.log(test.noModelArr[0].userMsg?.getChangeData())
// undefined
// endregion log
