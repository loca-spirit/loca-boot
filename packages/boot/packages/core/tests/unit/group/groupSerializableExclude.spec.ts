import { GroupData } from '../model/group/GroupData'

describe('excludeGroup getSerializableObject', () => {
  describe('excludeGroup getSerializableObject', () => {
    it('group1 excludeGroup getSerializableObject', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getSerializableObject({ excludeGroup: 'group1' })).toEqual(
        { empty_group: '1' },
      )
    })
    it('group2 excludeGroup getSerializableObject', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getSerializableObject({ excludeGroup: 'group2' })).toEqual(
        { data1: '1', data2: '1', empty_group: '1' },
      )
    })
    it('group3 excludeGroup getSerializableObject', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getSerializableObject({ excludeGroup: 'group3' })).toEqual(
        { data1: '1', data2: '1', empty_group: '1' },
      )
    })
  })
})
