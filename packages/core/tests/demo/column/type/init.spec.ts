import { Column, ModelBase } from 'loca-boot-core'
// region model
class TestItem extends ModelBase {
  @Column()
  public msg?: string
}

class Test extends ModelBase {
  @Column()
  public a?: number
  @Column()
  public b?: string
  @Column()
  public c?: boolean
  @Column({})
  public d?: string[]
  @Column({
    model: () => TestItem,
    default: () => [],
  })
  public e?: TestItem[]
  @Column({
    model: () => TestItem,
    autowired: true,
  })
  public f?: TestItem
}
// endregion model

// region instance
const test = new Test({
  a: 1,
  b: 'hhh',
  c: true,
  d: ['123', '456'],
  e: [{ msg: '123' }, { msg: '456' }],
  f: { msg: 'message' },
})
// endregion instance

describe('type', () => {
  it('ModelBase未嵌套不需要传入，但是要正确的声明', () => {
    expect(test.a).toBe(1) // PASS
    expect(test.b).toBe('hhh') // PASS
    expect(test.c).toBe(true) // PASS
    expect(test.d).toEqual(['123', '456']) // PASS
  })
  it('ModelBase嵌套需要通过model传入', () => {
    expect(test.e).toEqual([{ msg: '123' }, { msg: '456' }]) // PASS
    expect(test.f).toEqual({ msg: 'message' }) // PASS
  })
})

// region log
console.log(test.a)
// 1

console.log(test.b)
// "hhh"

console.log(test.c)
// true

console.log(test.d)
// ["123", "456"]

console.log(test.e)
// [{ msg: "123" }, { msg: "456" }]

console.log(test.f)
// { msg: "message" }
// endregion log
