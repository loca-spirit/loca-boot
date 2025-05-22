import { Column, ModelBase } from "loca-boot-core"
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

// region fn
test1.saveChangedData()
// endregion fn

describe("isModelEqual", () => {
  it("isModelEqual()", () => {
    expect(test1.revertChangedData()).toEqual({
      str: "new",
    }) // PASS
  })
})

// region log
console.log(test1.revertChangedData())
// { str: "new" }
// endregion log