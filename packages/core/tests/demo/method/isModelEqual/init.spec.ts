import { Column, ModelBase } from "loca-boot-core"
// region model
class Test extends ModelBase {
  @Column()
  public str?: string
}
// endregion model

// region instance
const test1 = new Test({
  str: "str",
})
const test2 = new Test({
  str: "str",
})
const test3 = new Test({
  str: "num",
})
//endregion instance

describe("isModelEqual", () => {
  it("isModelEqual()", () => {
    expect(test1.isContainsModel(test2)).toBe(true) // PASS
  })
  it("isModelEqual()", () => {
    expect(test1.isModelEqual(test3)).toBe(false) // PASS
  })
})

// region log
console.log(test1.isContainsModel(test2))
// true

console.log(test1.isModelEqual(test3))
// false
//endregion log