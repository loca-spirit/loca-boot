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
  @Column({ model: () => ConsumerItem })
  list?: ConsumerItem[]
  @Column({ model: () => ConsumerItem, type: 'record' })
  objRecord?: { [key: string]: ConsumerItem }
  @Column({ model: () => ConsumerItem, type: 'recordArray' })
  objRecordArr?: { [key: string]: ConsumerItem[] }
  obj?: { [key: string]: any }
}

describe('deserialize', () => {
  it('array and record and recordArray', () => {
    const expected = {
      id: 'org',
      message: '031-3939234',
      list: [{ id: '1', message: 'test' }],
      obj_record: { a: { id: '1', message: 'test' } },
      obj_record_arr: { a: [{ id: '1', message: 'test' }] },
    }
    const c = deserialize(ConsumerItem, {
      id: 'org',
      message: '031-3939234',
      list: [{ id: '1', message: 'test' }],
      objRecord: { a: { id: '1', message: 'test' } },
      objRecordArr: { a: [{ id: '1', message: 'test' }] },
      obj: { a: '1' },
    })

    expect(serialize(c)).toEqual(expected)
  })
  it('deserializeArray', () => {
    const expected = {
      id: 'org',
      message: '031-3939234',
      list: [{ id: '1', message: 'test' }],
      obj_record: { a: { id: '1', message: 'test' } },
      obj_record_arr: { a: [{ id: '1', message: 'test' }] },
    }
    const c = deserializeArray(ConsumerItem, [
      {
        id: 'org',
        message: '031-3939234',
        list: [{ id: '1', message: 'test' }],
        objRecord: { a: { id: '1', message: 'test' } },
        objRecordArr: { a: [{ id: '1', message: 'test' }] },
        obj: { a: '1' },
      },
    ])

    expect(serialize(c)).toEqual([expected])
  })
  it('deserializeRecord', () => {
    const expected = {
      a: {
        id: 'org',
        message: '031-3939234',
        list: [{ id: '1', message: 'test' }],
        obj_record: { a: { id: '1', message: 'test' } },
        obj_record_arr: { a: [{ id: '1', message: 'test' }] },
      },
    }
    const c = deserializeRecord(ConsumerItem, {
      a: {
        id: 'org',
        message: '031-3939234',
        list: [{ id: '1', message: 'test' }],
        objRecord: { a: { id: '1', message: 'test' } },
        objRecordArr: { a: [{ id: '1', message: 'test' }] },
        obj: { a: '1' },
      },
    })

    expect(serialize(c)).toEqual(expected)
  })

  it('deserializeRecordArray', () => {
    const expected = {
      a: [
        {
          id: 'org',
          message: '031-3939234',
          list: [{ id: '1', message: 'test' }],
          obj_record: { a: { id: '1', message: 'test' } },
          obj_record_arr: { a: [{ id: '1', message: 'test' }] },
        },
      ],
    }
    const c = deserializeRecordArray(ConsumerItem, {
      a: [
        {
          id: 'org',
          message: '031-3939234',
          list: [{ id: '1', message: 'test' }],
          objRecord: { a: { id: '1', message: 'test' } },
          objRecordArr: { a: [{ id: '1', message: 'test' }] },
          obj: { a: '1' },
        },
      ],
    })
    expect(serialize(c)).toEqual(expected)
  })
})
