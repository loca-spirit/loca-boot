import { Consumer } from '../model/Consumer'
import { ConsumerItem } from '../model/ConsumerItem'

describe('ModelBase', () => {
  describe('getChangedData', () => {
    it('method: getChangedDescriptor has array and object', () => {
      const expectData = {
        consumerList: {
          primaryChangeDescriptor: {
            create: [
              {
                id: '3',
                message: 'message3',
              },
            ],
            delete: [
              {
                id: '4',
                message: 'message4',
              },
            ],
            update: [
              {
                id: '2',
                name: 'newName',
              },
            ],
            noChange: [
              {
                id: '1',
              },
            ],
          },
          dataKey: 'consumer_list',
          currentValue: [
            {
              id: '1',
            },
            {
              id: '2',
              name: 'newName',
            },
            {
              id: '3',
              message: 'message3',
            },
          ],
          oldValue: [
            {
              id: '1',
            },
            {
              id: '2',
              message: 'message2',
            },
            {
              id: '4',
              message: 'message4',
            },
          ],
          changeDescriptor: {
            update: [
              {
                id: '1',
              },
              {
                id: '2',
                name: 'newName',
              },
              {
                id: '3',
                message: 'message3',
              },
            ],
          },
          action: 'UPDATE',
        },
      }

      // init data
      const c = new Consumer({
        consumerList: [
          {
            id: '1',
          },
          {
            id: '2',
            message: 'message2',
          },
          {
            id: '4',
            message: 'message4',
          },
        ],
      })
      c.saveChangedData()

      // update id 2
      c.consumerList[1].setColumnData('message', undefined)
      c.consumerList[1].name = 'newName'

      // add id 3
      const cItem = new ConsumerItem({ id: '3' })
      cItem.message = 'message3'
      c.consumerList.push(cItem)

      // remove id 4
      c.consumerList = c.consumerList.filter((item) => {
        if (item.id !== '4') {
          return true
        }
      })
      expect(c.getChangedDescriptor()).toEqual(expectData)
    })
  })
})
