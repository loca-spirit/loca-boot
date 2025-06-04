import { Column, ModelBase } from "@model-base/core"
// region model
class Test extends ModelBase {
  @Column()
  public str?: string

  @Column()
  public num?: number
}
// endregion model

// region instance
const test = new Test({
  str: "str",
})
// endregion instance

// region change
test.num = 1
// endregion change

// region fn
test.saveChangedData()
// endregion fn

describe("getOriginalData", () => {
  it("getOriginalData()", () => {
    expect(test.getOriginalData()).toEqual({ str: "str", num: 1 }) // PASS
  })
})

// region log
console.log(test.getOriginalData())
// { str: "str", num: 1 }
// endregion log