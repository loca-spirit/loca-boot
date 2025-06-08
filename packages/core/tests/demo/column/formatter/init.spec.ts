import { Column, IColumnDeserialize, IColumnSerialize, ModelBase } from '@model-base/core'
// region fn

function deserializeData(data: IColumnDeserialize) {
  return data.value?.toFixed(2).toString()
}

function serializeData(data: IColumnSerialize) {
  return parseFloat(data.value)
}
// endregion fn

//region model
class Test extends ModelBase {
  @Column({
    default: '0.00',
    serialize: serializeData,
    deserialize: deserializeData,
  })
  public id?: string
}
// endregion model

//region instance
const test1 = new Test({
  id: 12.361222,
})
const test2 = new Test({
  id: 12.346222,
})
// endregion instance

describe('deserialize and serialize', () => {
  it('将精度是两位小数的字符串转换为后端给的数据', () => {
    const serializeData = test1.getSerializableObject()
    expect(serializeData.id).toBe(12.36) // PASS
  })
  it('将后端给的数据转换为精度是两位小数的字符串', () => {
    const serializeData = test2.getSerializableObject()
    expect(serializeData.id).toBe(12.35) // PASS
  })
})

// region log
console.log(test1.id)
// "12.36"
console.log(test2.id)
// "12.35"
// endregion log
