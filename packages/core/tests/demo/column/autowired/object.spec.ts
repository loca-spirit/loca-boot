import { Column, ModelBase } from 'loca-boot-core'
//region model
class TestItem extends ModelBase {
  @Column()
  public message?: string
}

class Test extends ModelBase {
  // 对象初始化
  @Column({
    model: () => TestItem,
    autowired: true,
  })
  public initObject?: TestItem

  // 对象未初始化
  @Column({
    model: () => TestItem,
    autowired: false,
  })
  public noInitObject?: TestItem
}
//endregion model

//region instance
const test = new Test()
//endregion instance

describe('autowired', () => {
  it('对象初始化', () => {
    expect(test.initObject).toEqual({ message: undefined }) // PASS
  })
  it('对象未初始化', () => {
    expect(test.noInitObject).toEqual(undefined) // PASS
  })
})

// region log
console.log(test.initObject)
// { message: undefined }

console.log(test.noInitObject)
// undefined
// endregion log
