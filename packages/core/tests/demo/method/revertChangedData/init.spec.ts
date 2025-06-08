import { Column, ModelBase } from "@model-base/core"
// region model
class Test extends ModelBase {
  @Column()
  public str?: string
}
// endregion model

// region instance
const test1 = new Test({
  str: "old",
})
// endregion instance

// region change
test1.str = "new"
// endregion change

describe("revertChangedData", () => {
  it("revertChangedData()", () => {
    expect(test1.revertChangedData()).toEqual({
      str: "old",
    }) // PASS
  })
})

// region log
console.log(test1.revertChangedData())
// { str: "old" }
// endregion log
