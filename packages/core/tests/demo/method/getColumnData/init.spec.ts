import { Column, ModelBase } from "loca-boot-core"
// region model
class Test extends ModelBase {
  @Column()
  public str?: string

  @Column()
  public arr?: any[]
}
// endregion model

// region instance
const test = new Test({
  str: "str",
  arr: [1, "a", true],
})
// endregion instance

describe("getColumnData", () => {
  it("getColumnData('str')", () => {
    expect(test.getColumnData("str")).toBe("str") // PASS
  })
  it("getColumnData('arr')", () => {
    expect(test.getColumnData("arr")).toEqual([1, "a", true]) // PASS
  })
})

// region log
console.log(test.getColumnData("str"))
// "str"

console.log(test.getColumnData("arr"))
// [1, "a", true]
// endregion log