import { Column, ModelBase, serialize } from '@model-base/core'
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

describe('mergeModel', () => {
  it('array and record and recordArray', () => {
    const expected = {
      id: 'org2',
      message: '2',
      list: [{ id: '2', message: 'test2' }],
      obj_record: { a: { id: '2', message: 'test2' } },
      obj_record_arr: { a: [{ id: '2', message: 'test2' }] },
    }
    const listItem = new ConsumerItem({
      id: 'org',
      message: '1',
      list: [{ id: '1', message: 'test' }],
      objRecord: { a: { id: '1', message: 'test' } },
      objRecordArr: { a: [{ id: '1', message: 'test' }] },
      obj: { a: '1' },
    })
    // ConsumerItem.createModel() !== ConsumerItem.create().mergeModel

    const formData = ConsumerItem.create().mergeModel({
      ...listItem,
      id: 'org2',
      message: '2',
      list: [{ id: '2', message: 'test2' }],
      objRecord: { a: { id: '2', message: 'test2' } },
      objRecordArr: { a: [{ id: '2', message: 'test2' }] },
      obj: { a: '2' },
    })
    console.log(formData)
    // expect(serialize(formData)).toEqual(expected)
  })
})
