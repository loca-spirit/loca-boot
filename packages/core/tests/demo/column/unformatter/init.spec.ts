import { Column, ModelBase } from 'loca-boot-core'
// region fn
interface formatter {
  value: any // 当前值
  key: string // 当前key
  data: any // 所有数据
  columns: any[] // 所有的column的定义
}

function unfNumber3({ value, key, data, columns }: formatter) {
  return value?.toFixed(2).toString()
}
// endregion fn

// region model
class Test extends ModelBase {
  @Column({ unformatter: unfNumber3 }) 
  public a?: number
}
// endregion model

// region instance
const test = new Test({
  a: 123.456,
})
// endregion instance

describe('unformatter', () => {
  it('将给后端的数据转换为精度是两位小数的字符串', () => {
    expect(test.getSerializableObject()).toEqual({ a: '123.46'}) // PASS
  })
})

// region log
console.log(test.getSerializableObject())
// { a: '123.46'}
// endregion log