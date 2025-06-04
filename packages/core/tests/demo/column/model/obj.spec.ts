import { Column, ModelBase } from '@model-base/core'
// region model
class TestItem1 extends ModelBase {
  @Column()
  public userMsg1?: number
}

class TestItem2 extends ModelBase {
  @Column()
  public userMsg2?: number
}

class Test extends ModelBase {
  @Column({
    model: () => TestItem1,
    autowired: true,
  })
  public modelObject?: TestItem1
  @Column({
    model: () => TestItem1,
  })
  public noModelObject1?: TestItem1
  @Column({
    model: () => TestItem2,
    autowired: true,
  })
  public noModelObject2?: TestItem2
}
// endregion model

// region instance
const test = new Test({
  model_object: { user_msg1: 123 },
  no_model_object1: { user_msg1: 111 },
  no_model_object2: { user_msg2: 222 },
})
// endregion instance

describe('model', () => {
  it('传入了model，对象字段会下划线转驼峰', () => {
    expect(test.modelObject).toEqual({ userMsg1: 123 }) // PASS
  })
  it('未传入model，但嵌套的内层类型在外层类型上面定义的，对象字段下划线也会转驼峰', () => {
    expect(test.noModelObject1).toEqual({ userMsg1: 111 }) // PASS
  })
  // it("未传入model，且嵌套的内层类型在外层类型下面定义的，对象字段下划线不会转驼峰", () => {
  //   console.log(test)
  //   // expect(test.noModelObject2).toEqual({ user_msg2: 222 }) // PASS
  // })
})

// region log
// 传入了model，对象字段会下划线转驼峰
console.log(test.modelObject)
// { userMsg1: 123 }

// 未传入model，但嵌套的内层类型在外层类型上面定义的，对象字段下划线也会转驼峰
console.log(test.noModelObject1)
// { userMsg1: 111 }

// 未传入model，且嵌套的内层类型在外层类型下面定义的，对象字段下划线不会转驼峰
console.log(test.noModelObject2)
// { user_msg2: 222 }
// endregion log
