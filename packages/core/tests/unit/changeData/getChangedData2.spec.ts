import { CLEAN_ENUM } from '@model-base/core'
import { Consumer } from '../model/Consumer'

describe('getChangedData test2', () => {
  it('getChangedData() has array and object', () => {
    const expectData = {
      user_name: null,
    }
    const c = new Consumer({ userName: 'shuai' })
    c.userName = null as any
    expect(c.getChangedData({ clean: CLEAN_ENUM.CLEAN_UNDEFINED })).toEqual(expectData)
  })
  it('getChangedData()1 CLEAN_UNDEFINED', () => {
    const expectData = {
      id: undefined,
    }
    const c = new Consumer({
      id: 1,
      userName: 'shuai',
      consumerObject: { id: 1, message: 'message1', name: 'name1' },
    })
    c.id = undefined as any
    c.userName = null as any
    c.phoneNumber = undefined as any
    expect(c.getChangedData()).toEqual(expectData)
  })
  it('getChangedData()1 CLEAN_UNDEFINED_AND_NULL empty #', () => {
    const expectData = {
      id: '',
      user_name: undefined,
      consumer_object: { message: 'message1' },
    }
    const c = new Consumer({
      id: 2,
      userName: 'shuai',
      consumerObject: { id: 1, message: 'message1' },
    })
    c.id = '' as any
    c.userName = null as any
    c.consumerObject.id = null as any
    expect(c.getChangedData()).toEqual(expectData)
  })
  it('getChangedData()1 CLEAN_UNDEFINED_AND_NULL', () => {
    const expectData = {
      consumer_object: { id: 1 },
    }
    const c = new Consumer({
      id: 1,
      userName: 'shuai',
      consumerObject: { id: 1, message: 'message1' },
    })
    c.id = null as any
    c.consumerObject.message = null as any
    expect(c.getChangedData()).toEqual(expectData)
  })
})
