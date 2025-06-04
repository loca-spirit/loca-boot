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
const test1 = new Test({
  str: "old",
})
// endregion instance

describe("setColumnData", () => {
  it("setColumnData()", () => {
    expect(test1.setColumnData("num", 123)).toEqual({ str: "old", num: 123 }) // PASS
  })
})

// region log
console.log(test1.setColumnData("num", 123))
// { str: "old", num: 123 }
// endregion log