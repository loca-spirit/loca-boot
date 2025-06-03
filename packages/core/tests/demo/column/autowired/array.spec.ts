import { Column, ModelBase } from 'loca-boot-core'
// region model
class TestItem extends ModelBase {
  @Column()
  public message?: string
}
class Test extends ModelBase {
  // 数组初始化
  @Column({
    model: () => TestItem,
    autowired: true,
    type: 'array',
  })
  public initArray?: TestItem[]

  // 数组未进行初始化
  @Column({
    model: () => TestItem,
  })
  public noInitArray?: TestItem[]
}
// endregion model

// region instance
const test = new Test()
// endregion instance

describe('autowired', () => {
  it('数组初始化', () => {
    expect(test.initArray).toEqual([]) // PASS
  })
  it('数组未初始化', () => {
    expect(test.noInitArray).toEqual(undefined) // PASS
  })
})

//region log
console.log(test.initArray)
// []

console.log(test.noInitArray)
// undefined
//endregion log
