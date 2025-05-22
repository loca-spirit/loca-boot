import { Column, ModelBase } from "loca-boot-core"
// region model
class Test extends ModelBase {
  @Column({ group: "group1" })
  public a?: string

  @Column({ group: "group2" })
  public b?: string

  @Column({ group: ["group1", "group2"] })
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

describe("group", () => {
  it("getChangedData({ group: 'group1' })", () => {
    // 获得column中被标记为“group1”的属性与没有做任何group标记的属性的并集（变化的数据）
    expect(test.getChangedData({ group: "group1" })).toEqual({
      a: "2",
      c: "2",
      empty: "2",
    }) // PASS
  })
  it("getChangedData({ excludeGroup: 'group1' })", () => {
    // 获得column中没有被标记为“group1”的所有属性（变化的数据）
    expect(test.getChangedData({ excludeGroup: "group1" })).toEqual({
      empty: "2",
    }) // PASS
  })
  it("getChangedData()", () => {
    // 获得所有属性（变化的数据）
    expect(test.getChangedData()).toEqual({
      a: "2",
      c: "2",
      empty: "2",
    }) // PASS
  })
})

// region log
// 获得column中被标记为“group1”的属性与没有做任何group标记的属性的并集（变化的数据）
console.log(test.getChangedData({ group: "group1" }))
// { a: "2", c: "2", empty: "2" }

// 获得column中被标记为“group1”的属性与没有做任何group标记的属性的并集（变化的数据）
console.log(test.getChangedData({ excludeGroup: "group1" }))
// { empty: "2" }

// 获得column中被标记为“group1”的属性与没有做任何group标记的属性的并集（变化的数据）
console.log(test.getChangedData())
// { a: "2", c: "2", empty: "2" }
// endregion log