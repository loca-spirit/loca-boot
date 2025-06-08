import {
  Column,
  deserialize,
  deserializeArray,
  deserializeRecord,
  deserializeRecordArray,
  ModelBase,
  serialize,
} from '@model-base/core'
class ConsumerItem extends ModelBase {
  @Column()
  id?: string
  @Column()
  message?: string
  @Column()
  testMy?: string
  @Column({ model: () => ConsumerItem, default: () => [] })
  list?: ConsumerItem[]
  @Column({ model: () => ConsumerItem, type: 'record' })
  objRecord?: { [key: string]: ConsumerItem }
  @Column({ model: () => ConsumerItem, type: 'recordArray' })
  objRecordArr?: { [key: string]: ConsumerItem[] }
  obj?: { [key: string]: any }
}

describe('defaultValue by deserialize and new', () => {
  it('array and record and recordArray', () => {
    const expected = {
      id: 'org',
      message: '031-3939234',
      list: [],
      obj_record: { a: { id: '1', message: 'test', list: [] } },
      obj_record_arr: { a: [{ id: '1', message: 'test', list: [] }] },
    }
    const dto = {
      id: 'org',
      message: '031-3939234',
      objRecord: { a: { id: '1', message: 'test' } },
      objRecordArr: { a: [{ id: '1', message: 'test' }] },
      obj: { a: '1' },
    }
    const c = deserialize(ConsumerItem, dto)
    const c2 = new ConsumerItem(dto)
    expect(serialize(c)).toEqual(expected)
    expect(serialize(c2)).toEqual(expected)
  })
})
