import { Consumer } from '../model/Consumer'
import { ConsumerItem } from '../model/ConsumerItem'

describe('ModelBase', () => {
  describe('getChangedData3', () => {
    it('getChangedData({descriptor: true}) has array and object', () => {
      const expectData = {
        consumerList: {
          primaryChangeDescriptor: {
            create: [{
              id: '3',
              message: 'test'
            }],
            delete: [{
              id: '4',
              message: 'msg4'
            }],
            update: [],
            noChange: [{
              id: '1'
            }, {
              id: '2',
              message: 'msg2'
            }]
          },
          dataKey: 'consumer_list',
          currentValue: [{
            id: '3',
            message: 'test'
          }, {
            id: '1'
          }, {
            id: '2',
            message: 'msg2'
          }],
          oldValue: [{
            id: '1'
          }, {
            id: '2',
            message: 'msg2'
          }, {
            id: '4',
            message: 'msg4'
          }],
          changeDescriptor: {
            update: [{
              id: '3',
              message: 'test'
            }, {
              id: '1'
            }, {
              id: '2',
              message: 'msg2'
            }]
          },
          action: 'UPDATE'
        }
      }
      const c = new Consumer({ userName: 'shuai' })
      const cItemId1 = new ConsumerItem({ id: '1' })
      const cItemId2 = new ConsumerItem({ id: '2', message: 'msg2' })
      const cItemId4 = new ConsumerItem({ id: '4', message: 'msg4' })
      c.consumerList.push(cItemId1)
      c.consumerList.push(cItemId2)
      c.consumerList.push(cItemId4)

      c.saveChangedData()

      const cItem = new ConsumerItem({ id: '3' })
      cItem.message = 'test'
      c.consumerList.unshift(cItem)
      c.consumerList = c.consumerList.filter((item) => {
        if (item.id !== '4') {
          return true
        }
      })
      expect(c.getChangedDescriptor()).toEqual(expectData)
    })
  })
})
