import { Column, ModelBase } from "loca-boot-core"
// region model
class Test extends ModelBase {
  @Column({ name: "user_age" })
  public age?: string

  @Column({ name: "user_name" })
  public name?: string
}
// endregion model

// region instance
const test = new Test({
  user_age: "19",
  user_name: "Luffy",
})
// endregion instance

describe("name", () => {
  it("自定义字段名", () => {
    expect(test.age).toBe("19") // PASS
    expect(test.name).toBe("Luffy") // PASS
  })

  it("output流向数据会使用原来的key", () => {
    expect(test.getSerializableObject()).toEqual({
      user_age: "19",
      user_name: "Luffy",
    }) // PASS
  })
})

// region log
console.log(test.age)
// "19"

console.log(test.name)
// "Luffy"

console.log(test.getSerializableObject())
// { user_age: "19", user_name: "Luffy" }
// endregion log