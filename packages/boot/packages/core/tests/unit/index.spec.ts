import { ResourceInfo } from './model/ResourceInfo'
import { Consumer } from './model/Consumer'
import { ConsumerItem } from './model/ConsumerItem'
import { ColumnCamelCase } from './model/ColumnCamelCase'
import { ModelBase } from 'loca-boot-core'

describe('ModelBase', () => {
  describe('construct', () => {
    const createModelDTO = {
      resource_id: '1',
      resource_type: 'type1',
      is_online: false,
      description: 'desc1'
    }

    const instance1 = new ResourceInfo(createModelDTO)

    it('create model', () => {
      expect(instance1.resourceId).toBe('1')
      expect(instance1.isOnline).toBe(false)
      expect(instance1.resourceType).toBe('type1')
      expect(instance1.description).toBe('desc1')
    })

    it('consumerList: ConsumerItem[], dto consumer_list set to undefined.', () => {
      const c = new Consumer({ consumer_list: undefined })
      expect(c.consumerList).toHaveLength(0)
    })
  })

  describe('update', () => {
    const createModelDTO = {
      resource_id: '1',
      resource_type: 'type1',
      description: 'desc1'
    }

    const updateModelDTO = {
      resource_id: '1',
      resource_type: 'type2',
      description: 'desc2'
    }

    const instance2 = new ResourceInfo(createModelDTO)
    instance2.update(updateModelDTO)
    it('update model', () => {
      expect(instance2.resourceId).toBe('1')
      expect(instance2.resourceType).toBe('type2')
      expect(instance2.description).toBe('desc2')
    })
  })

  describe('getCleanSerializableObject', () => {
    it('list: string[] does not set, default is [].', () => {
      const c = new Consumer()
      const list = c.getCleanSerializableObject().list
      expect(list).toBeUndefined()
    })
    it('consumerList: ConsumerItem[] does not set, default is [].', () => {
      const c = new Consumer()
      const dto = c.getCleanSerializableObject()
      expect(dto.list).toBeUndefined()
    })
  })

  describe('getSerializableObject', () => {
    it('list: string[] does not set, default is []', () => {
      const c = new Consumer()
      const dto = c.getSerializableObject()
      expect(dto.list.length).toEqual(0)
    })

    it('consumerList: ConsumerItem[] does not set, default is [].', () => {
      const c = new Consumer()
      const dto = c.getSerializableObject()
      expect(dto.consumer_list).toHaveLength(0)
    })
  })

  describe('getColumnNames', () => {
    it('getColumnNames: ConsumerItem[], push one item to list, then save changed.', () => {
      ModelBase.columnNamingMethod = 'camelCase'
      const c = new ColumnCamelCase({ userName: 'mengshuai' })
      expect(c.getSerializableObject()).toEqual({ userName: 'mengshuai', list: [], consumerList: [] })
      ModelBase.columnNamingMethod = ''
    })
  })

  describe('getClone', () => {
    it('getClone.', () => {
      ModelBase.columnNamingMethod = 'camelCase'
      const c = new ColumnCamelCase({ list: [] })
      c.list.push('test')
      expect(c.getOriginalData()).toEqual({ list: [], consumerList: [] })
      ModelBase.columnNamingMethod = ''
    })
  })

  describe('saveChangedData', () => {
    it('consumerList: ConsumerItem[], push one item to list, then save changed.', () => {
      const c = new Consumer()
      c.consumerList.push(new ConsumerItem({ message: 1 }))
      expect(c.getOriginalData()).toEqual({ list: [], consumer_list: [] })
      c.saveChangedData()
      expect(c.getChangedData()).toEqual({})
      expect(c.getOriginalData()).toEqual({ list: [], consumer_list: [{ message: 1 }] })
    })
  })
})
