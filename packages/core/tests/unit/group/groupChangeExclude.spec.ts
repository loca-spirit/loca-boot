import { GroupData } from '../model/group/GroupData'

describe('Group getChangedData excludeGroup', () => {
  describe('Group getChangedData excludeGroup', () => {
    it('group1 getChangedData', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getChangedData({ excludeGroup: 'group1' })).toEqual(
        { empty_group: '1' },
      )
    })
    it('group2 getChangedData', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getChangedData({ excludeGroup: 'group2' })).toEqual(
        { data1: '1', data2: '1', empty_group: '1' },
      )
    })
    it('no group getChangedData', () => {
      const c = new GroupData({ data1: 'data1', data2: 'data2', data3: 'data3' })
      c.data1 = '1'
      c.data2 = '1'
      c.data3 = '1'
      c.emptyGroup = '1'
      expect(c.getChangedData()).toEqual(
        { data1: '1', data2: '1', data3: '1', empty_group: '1' },
      )
    })
  })
})
