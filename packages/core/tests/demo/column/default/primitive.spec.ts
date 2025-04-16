import { Column, ModelBase } from "loca-boot-core"
// region model
class Test extends ModelBase {
  @Column({ default: 1 })
  public num?: number

  @Column({ default: "hhh" })
  public str?: string

  @Column({ default: true })
  public bool?: boolean
}
// endregion model

// region instance
const test = new Test({
  str: "xxx",
})
// endregion instance

// region change
test.bool = false
// endregion change

describe("default", () => {

  it("普通类型没有获取到值则用初始值", () => {
    expect(test.num).toBe(1) // PASS
    expect(test.str).toBe("xxx") // PASS
    expect(test.bool).toBe(false) // PASS
  })
})

// region log
console.log(test.num)
// 1

console.log(test.str)
// "xxx"

console.log(test.bool)
// false
// endregion log