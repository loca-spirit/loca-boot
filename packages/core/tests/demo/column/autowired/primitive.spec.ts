import { Column, ModelBase } from "@model-base/core"
// region model
class Test extends ModelBase {
  // 数字类型
  @Column({ autowired: true })
  public num?: number

  // 字符串类型
  @Column({ autowired: true })
  public str?: string

  // 布尔类型
  @Column({ autowired: true })
  public bool?: boolean
}
// endregion model

// region instance
const test = new Test()
// endregion instance

describe("autowired", () => {
  it("autowired 不能用于普通类型", () => {
    expect(test.num).toBe(undefined) // PASS
    expect(test.str).toBe(undefined) // PASS
    expect(test.bool).toBe(undefined) // PASS
  })
})

// region log
console.log(test.num)
// undefined

console.log(test.str)
// undefined

console.log(test.bool)
// undefined
// endregion log