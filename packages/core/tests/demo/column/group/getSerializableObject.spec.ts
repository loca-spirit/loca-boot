import { Column, ModelBase } from "@model-base/core"
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
const test = new Test({
  a: "1",
  b: "1",
  c: "1",
  empty: "1",
})
// endregion instance

describe("group", () => {
  it("getSerializableObject({ group: 'group1' })", () => {
    // 获得column中被标记为“group1”的属性与没有做任何group标记的属性的并集
    expect(test.getSerializableObject({ group: "group1" })).toEqual({
      a: "1",
      c: "1",
      empty: "1",
    }) // PASS
  })
  it("getSerializableObject({ excludeGroup: 'group1' })", () => {
    // 获得column中没有被标记为“group1”的所有属性
    expect(test.getSerializableObject({ excludeGroup: "group1" })).toEqual({
      b: "1",
      empty: "1",
    }) // PASS
  })
  it("getSerializableObject()", () => {
    // 获得所有属性
    expect(test.getSerializableObject()).toEqual({
      a: "1",
      b: "1",
      c: "1",
      empty: "1",
    }) // PASS
  })
})

// region log
// 获得column中被标记为“group1”的属性与没有做任何group标记的属性的并集（变化的数据）
console.log(test.getSerializableObject({ group: "group1" }))
// { a: "1", c: "1", empty: "1" }

// 获得column中被标记为“group1”的属性与没有做任何group标记的属性的并集（变化的数据）
console.log(test.getSerializableObject({ excludeGroup: "group1" }))
// { b: "1", empty: "1" }

// 获得column中被标记为“group1”的属性与没有做任何group标记的属性的并集（变化的数据）
console.log(test.getSerializableObject())
// { a: "1", b: "1", c: "1", empty: "1" }
// endregion log