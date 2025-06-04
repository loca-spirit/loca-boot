import { Column, ModelBase } from "@model-base/core"
// region model
class Test extends ModelBase {
  @Column()
  public str?: string
}
// endregion model

// region instance
const test1 = new Test()
// endregion instance

// region fn
test1.setDataByOriginal({ str: "old" }, { keepBackUp: false })
// endregion fn

describe("setDataByOriginal", () => {
  it("getChangedData()", () => {
    expect(test1.getChangedData()).toEqual({}) // PASS
  })
  it("isChanged()", () => {
    expect(test1.isChanged()).toEqual(false) // PASS
  })
})

// region log
console.log(test1.getChangedData())
// {}

console.log(test1.isChanged())
// false
// endregion log