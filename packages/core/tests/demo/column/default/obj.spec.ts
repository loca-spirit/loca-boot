import { Column, ModelBase } from "loca-boot-core"
// region model
class TestItem extends ModelBase {
  @Column()
  public message?: string
}

class Test extends ModelBase {
  @Column({ model: TestItem, autowired: true })
  public arrAuto?: TestItem[]

  @Column({ model: TestItem, default: true })
  public arrDef?: TestItem[]

  @Column({ model: TestItem, autowired: true })
  public obj?: TestItem
}
// endregion model

// region instance
const test = new Test()
// endregion instance

describe("default", () => {
  it("用于 Array 和 Object 类型建议使用autowired", () => {
    expect(test.arrAuto).toEqual([]) // PASS
    expect(test.obj).toEqual({ message: undefined }) // PASS
  })
  it("Array 和 Object 类型使用 autowired: true 与 default: true 效果一致", () => {
    expect(test.arrAuto).toEqual([]) // PASS
    expect(test.arrDef).toEqual([]) // PASS
  })
})

// region log
// Array 和 Object 类型使用 autowired: true 与 default: true 效果一致
console.log(test.arrAuto, test.arrDef)
// [],[]

// 用于 Array 和 Object 类型建议使用autowired
console.log(test.obj)
// { message: undefined }
// endregion log