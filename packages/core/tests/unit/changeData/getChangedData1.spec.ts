import { Consumer } from '../model/Consumer'
import { ConsumerItem } from '../model/ConsumerItem'

describe('ModelBase', () => {
  describe('getChangedData', () => {
    it('getChangedData({descriptor: true}) has array and object', () => {
      const expectData = {
        create: [{ id: '5', message: 'msg5' }],
        delete: [{ id: '1' }],
        update: [{ id: '2', message: 'msg2_new' }],
        noChange: [{ id: '4', message: 'msg4' }],
      }
      const c = new Consumer({ userName: 'shuai' })
      const cItemId1 = new ConsumerItem({ id: '1' })
      const cItemId2 = new ConsumerItem({ id: '2', message: 'msg2' })
      const cItemId4 = new ConsumerItem({ id: '4', message: 'msg4' })
      c.consumerList.push(cItemId1)
      c.consumerList.push(cItemId2)
      c.consumerList.push(cItemId4)

      c.saveChangedData()
      cItemId2.setColumnData('message', undefined)
      cItemId2.name = 'newName'
      const cItem = new ConsumerItem({ id: '3' })
      cItem.message = 'test'
      c.consumerList.push(cItem)
      c.consumerList = c.consumerList.filter((item) => {
        if (item.id !== '4') {
          return true
        }
      })
      // console.log(c.getOriginalData());
      c.setDataByOriginal(
        {
          consumer_list: [
            { id: '2', message: 'msg2_new' },
            { id: '4', message: 'msg4' },
            { id: '5', message: 'msg5' },
          ],
        },
        { keepBackUp: true }
      )
      expect(
        c.getChangedDescriptor().consumerList.primaryChangeDescriptor
      ).toEqual(expectData)
    })
  })
})
