import { Column, ModelBase } from 'loca-boot-core'
// region fn
interface formatter {
  value: any // 当前值
  key: string // 当前key
  data: any // 所有数据
  columns: any[] // 所有的column的定义
}

function formatterNumber2({ value, key, data, columns }: formatter) {
  return value?.toFixed(2).toString()
}
// endregion fn

//region model
class Test extends ModelBase {
  @Column({ default: '0.00', formatter: formatterNumber2 })
  public id?: string
}
// endregion model

//region instance
const test = new Test({
  id: 12.345,
})
// endregion instance

describe('formatter', () => {
  it('将后端给的数据转换为精度是两位小数的字符串', () => {
    expect(test.id).toBe('12.35') // PASS
  })
})

// region log
console.log(test.id)
// "12.35"
// endregion log