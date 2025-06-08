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

describe("setDataByOriginal", () => {
  it("getChangedData()", () => {
    expect(test1.update({ str: "str" })).toEqual({ str: "str" }) // PASS
  })
})

// region log
console.log(test1.update({ str: "str" }))
// { str: "str" }
// endregion log