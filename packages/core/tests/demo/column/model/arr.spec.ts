import { Column, ModelBase } from "loca-boot-core"
// region model
class TestItem extends ModelBase {
  @Column()
  public userMsg?: number
}

class Test extends ModelBase {
  @Column({ model: TestItem, autowired: true })
  public modelArray?: TestItem[]

  @Column()
  public noModelArray?: TestItem[]
}
// endregion model

// region instance
const test = new Test({
  model_array: [{ user_msg: 1 }],
  no_model_array: [{ user_msg: 111 }],
})
// endregion instance

describe("model", () => {
  it("传入了model，数组字段会下划线转驼峰", () => {
    expect(test.modelArray).toEqual([{ userMsg: 1 }]) // PASS
  })
  it("未传入model，数组字段下划线不会转驼峰", () => {
    expect(test.noModelArray).toEqual([{ user_msg: 111 }]) // PASS
  })
})

// region log
// 传入了model，数组字段会下划线转驼峰
console.log(test.modelArray)
// [{ userMsg: 1 }]

// 未传入model，数组字段下划线不会转驼峰
console.log(test.noModelArray)
// [{ user_msg: 111 }]
// endregion log