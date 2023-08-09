import { GroupData } from '../model/group/GroupData'

describe('Group getSerializableObject', () => {
  describe('Group getSerializableObject', () => {
    it('group1 getSerializableObject', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getSerializableObject({ group: 'group1' })).toEqual(
        { data1: '1', data2: '1', data3: '1', empty_group: '1' },
      )
    })
    it('group2 getSerializableObject', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getSerializableObject({ group: 'group2' })).toEqual(
        { data3: '1', empty_group: '1' },
      )
    })
    it('no group getSerializableObject', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getSerializableObject()).toEqual(
        { data1: '1', data2: '1', data3: '1', empty_group: '1' },
      )
    })
  })
})
