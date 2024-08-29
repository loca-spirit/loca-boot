import { Consumer } from '../model/Consumer'
import { ConsumerItem } from '../model/ConsumerItem'

describe('ModelBase', () => {
  describe('getChangedData', () => {
    it('getChangedData({descriptor: true}) has array and object', () => {
      const expectData = {
        consumerObject: {
          primaryChangeDescriptor: {
            create: {
              id: 'obj2',
              name: 'sname'
            },
            delete: {
              id: 'obj1',
              message: 'mes1',
              name: 'sname'
            }
          },
          dataKey: 'consumer_object',
          currentValue: {
            id: 'obj2',
            name: 'sname'
          },
          oldValue: {
            id: 'obj1',
            message: 'mes1',
            name: 'sname'
          },
          changeDescriptor: {
            update: {
              id: 'obj2',
              name: 'sname'
            }
          },
          action: 'UPDATE'
        }
      }
      const c = new Consumer({ userName: 'shuai' })
      c.consumerObject = new ConsumerItem({
        id: 'obj1',
        message: 'mes1',
        name: 'sname'
      })

      c.saveChangedData()

      c.consumerObject.setColumnData('message', undefined)
      c.consumerObject.setColumnData('id', 'obj2')
      expect(c.getChangedDescriptor()).toEqual(expectData)
    })
  })
})
