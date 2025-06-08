import { Consumer } from './model/Consumer'

describe('ModelBase', () => {
  describe('constructor', () => {
    it('serializeNamingStrategies is camelCase', () => {
      const c = new Consumer(
        { user_name: 'org', phoneNumber: '031-3939234' },
        { serializeNamingStrategies: 'camelCase' },
      )
      expect(c.getCleanSerializableObject()).toEqual({
        userName: 'org',
        phoneNumber: '031-3939234',
      })
    })
    it('serializeNamingStrategies is undefined', () => {
      const c = new Consumer(
        { user_name: 'org', phoneNumber: '031-3939234' },
        {
          serializeNamingStrategies: 'camelCase',
          deserializeNamingStrategies: 'camelCase',
        },
      )
      expect(c.getCleanSerializableObject()).toEqual({
        phoneNumber: '031-3939234',
      })
    })
  })

  describe('getChangedData', () => {
    it('serializeNamingStrategies is camelCase', () => {
      const c = new Consumer({ userName: 'org' }, { serializeNamingStrategies: 'camelCase' })
      c.userName = 'changed'
      expect(c.getChangedData()).toEqual({ userName: 'changed' })
    })
    it('serializeNamingStrategies is undefined', () => {
      const c = new Consumer({ userName: 'org' })
      c.userName = 'changed'
      expect(c.getChangedData()).toEqual({ user_name: 'changed' })
    })
  })

  describe('getSerializableObject', () => {
    it('serializeNamingStrategies is camelCase', () => {
      const c = new Consumer({ userName: 'org' }, { serializeNamingStrategies: 'camelCase' })
      c.userName = 'changed'
      expect(c.getSerializableObject()).toEqual({
        userName: 'changed',
        list: [],
        consumerList: [],
      })
      expect(c.getSerializableObject({ camelCase: true })).toEqual({
        userName: 'changed',
        list: [],
        consumerList: [],
      })
      expect(c.getSerializableObject({ camelCase: false })).toEqual({
        user_name: 'changed',
        list: [],
        consumer_list: [],
      })
    })
    it('serializeNamingStrategies is undefined', () => {
      const c = new Consumer({ userName: 'org' })
      c.userName = 'changed'
      c.phoneNumber = ''
      expect(c.getSerializableObject()).toEqual({
        user_name: 'changed',
        phone_number: '',
        list: [],
        consumer_list: [],
      })
      expect(c.getCleanSerializableObject()).toEqual({ user_name: 'changed' })
      expect(c.getSerializableObject({ camelCase: true })).toEqual({
        userName: 'changed',
        phoneNumber: '',
        list: [],
        consumerList: [],
      })
      expect(c.getSerializableObject({ camelCase: false })).toEqual({
        user_name: 'changed',
        phone_number: '',
        list: [],
        consumer_list: [],
      })
    })
  })
})
