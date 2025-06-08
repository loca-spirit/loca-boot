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
  num: 1,
})
// endregion instance

// region change
test.num = 2
// endregion change

describe("isChanged", () => {
  it("isChanged()", () => {
    expect(test.isChanged()).toBe(true) // PASS
  })
})

// region log
console.log(test.isChanged())
// true
// endregion log
