import { Consumer } from './model/Consumer'

describe('ModelBase trim', () => {
  describe('trim', () => {
    it('trim', () => {
      const c = new Consumer(
        {
          userName: ' shuai.meng ',
          consumerList: [{ name: ' shuai.meng ' }],
          consumerObject: { name: ' shuai.meng ' }
        }
      )
      expect(c.getCleanSerializableObject({ trim: true })).toEqual(
        {
          user_name: 'shuai.meng',
          consumer_list: [{ name: 'shuai.meng' }],
          consumer_object: { name: 'shuai.meng' }
        }
      )

      expect(c.getSerializableObject({ trim: true })).toEqual(
        {
          user_name: 'shuai.meng',
          list: [],
          consumer_list: [{ name: 'shuai.meng' }],
          consumer_object: { name: 'shuai.meng' }
        }
      )
      c.userName = ' shuai '
      c.consumerList[0].name = ' shuai '
      c.consumerObject.name = ' shuai '
      c.userName = ' shuai '
      expect(c.getChangedData({ trim: true })).toEqual(
        {
          user_name: 'shuai',
          consumer_list: [{ name: 'shuai' }],
          consumer_object: { name: 'shuai' }
        }
      )
    })
  })
})
