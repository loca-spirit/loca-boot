import { Column, ModelBase } from "loca-boot-core"
// region model
class Test extends ModelBase {
  public concatString() {
    this.res = this.a + this.b
  }

  @Column()
  public a!: string

  @Column()
  public b!: string

  @Column()
  public res?: string
}
// endregion model

// region instance
const test = new Test({
  a: "xx",
  b: "hh",
})
// endregion instance

describe("callMethod", () => {
  ModelBase.callMethod(test, { method: "concatString" })
  it("执行ModelBase内部的方法", () => {
    expect(test).toEqual({
      a: "xx",
      b: "hh",
      res: "xxhh",
    })
  })
})
//region fn
ModelBase.callMethod(test, { method: "concatString" })
//endregion fn

// region log
console.log(test)
// { a: "xx", b: "hh", res: "xxhh" }
// endregion log