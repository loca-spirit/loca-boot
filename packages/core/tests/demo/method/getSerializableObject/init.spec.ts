import { Column, ModelBase } from "@model-base/core"
// region model
class Test extends ModelBase {
  @Column()
  public str?: string

  @Column()
  public emptyStr?: string
}
// endregion model

// region instance
const test = new Test({
  str: "str",
  empty_str: "",
})
// endregion instance

describe("getSerializableObject", () => {
  it("getSerializableObject()", () => {
    expect(test.getSerializableObject()).toEqual({ str: "str", empty_str: "" }) // PASS
  })
})

// region log
console.log(test.getSerializableObject())
// { str: "str", empty_str: "" }
// endregion log