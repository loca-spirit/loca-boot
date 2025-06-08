import { createModel } from '@model-base/core'
import { Consumer } from './model/Consumer'

describe('create Model', () => {
  it('create Model test.', async () => {
    const dto = {
      id: 1,
      userName: 'mengyubo',
      consumerList: [
        {
          id: '1',
          message: 'test',
          test_my: 'testMy',
        },
      ],
      consumer_object: {
        id: '1',
        test_my: 'testMy',
        message: 'test',
      },
    }
    const model = createModel(Consumer, dto)
    const model2 = Consumer.create(dto)

    expect(model2.id).toBe(1)
    expect(model2.userName).toBe('mengyubo')
    expect(model2.consumerList[0].testMy).toBe('testMy')
    expect(model2.consumerObject.testMy).toBe('testMy')
    expect(model.id).toBe(1)
    expect(model.userName).toBe('mengyubo')
    expect(model.consumerList[0].testMy).toBe('testMy')
    expect(model.consumerObject.testMy).toBe('testMy')
  })
})
