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

describe("saveChangedData", () => {
  it("getChangedData()", () => {
    expect(test1.getChangedData()).toEqual({}) // PASS
  })
  it("isChanged()", () => {
    expect(test1.isChanged()).toEqual(false) // PASS
  })
})

// region log
console.log(test1.getChangedData())
// {}

console.log(test1.isChanged())
// false
// endregion log