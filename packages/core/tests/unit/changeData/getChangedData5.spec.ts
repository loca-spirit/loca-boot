import { Consumer } from '../model/Consumer'
import { ConsumerItem } from '../model/ConsumerItem'

describe('ModelBase', () => {
  describe('getChangedData', () => {
    it('getChangedDescriptor({descriptor: true}) has array and object', () => {
      const expectData = {
        userName: {
          dataKey: 'user_name',
          oldValue: 'shuai',
          action: 'DELETE',
          changeDescriptor: {
            delete: 'shuai'
          }
        },
      }
      const c = new Consumer({ userName: 'shuai' })
      c.setColumnData('userName', undefined)
      expect(c.getChangedDescriptor()).toEqual(expectData)
    })
  })
})
