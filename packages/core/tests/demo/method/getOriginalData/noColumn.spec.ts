import { Column, ModelBase } from "@model-base/core"
// region model
class Test extends ModelBase {
  @Column()
  public str?: string

  public num?: number
}
// endregion model

// region instance
const test = new Test({
  str: "str",
  num: 1
})
// endregion instance

describe("getOriginalData", () => {
  it("getOriginalData()", () => {
    expect(test.getOriginalData()).toEqual({str:"str"}) // PASS
  })
})

// region log
console.log(test.getOriginalData())
// {str:"str"}
// endregion log