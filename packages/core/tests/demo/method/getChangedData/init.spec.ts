import { Column, ModelBase } from "loca-boot-core"
// region model
class Test extends ModelBase {
  @Column()
  public a?: string

  @Column()
  public b?: string

  @Column()
  public c?: string

  @Column()
  public empty?: string
}
// endregion model

// region instance
const test = new Test({ a: "1", b: "1", c: "1" })
// endregion instance

// region change
// 修改a，c属性，添加empty属性，b属性不变
test.a = "2"
test.c = "2"
test.empty = "2"
// endregion change

describe("getChangeData", () => {
  it("getChangedData()", () => {
    expect(test.getChangedData()).toEqual({
      a: "2",
      c: "2",
      empty: "2",
    }) // PASS
  })
})

// region log
console.log(test.getChangedData())
// { a: "2", c: "2", empty: "2" }
// endregion log