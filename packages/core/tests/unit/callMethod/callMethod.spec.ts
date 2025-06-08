import { Consumer } from '../model/Consumer'
import { dynamicModelBase } from '@model-base/core'

describe('inject dataModel callMethod', () => {
  describe('method: changeUserName', () => {
    it('method: changeUserName', () => {
      const c = new Consumer({
        consumerList: [
          {
            id: '1',
          },
          {
            id: '2',
            message: 'message2',
          },
          {
            id: '4',
            message: 'message4',
          },
        ],
        consumerObject: {
          id: '1',
        },
      })
      c.callMethod({ method: 'changeUserName' })
      expect(c.userName).toEqual('new Name')
    })
  })

  describe('class callMethod', () => {
    it('method: init', () => {
      const c = new Consumer({ consumerObject: {} })
      c.callMethod({ method: 'init' })
      expect(c.userName).toEqual('id_message')
    })
  })

  describe('dynamicModelBase callMethod', () => {
    it('method: changeUserName', () => {
      const columns = {
        userName: {
          type: 'string',
        },
      }
      const model1 = new (dynamicModelBase(columns, {
        methods: {
          changeUserName: '{{$model.userName = "new Name1"}}',
        },
      }))({
        userName: 'success',
      })
      model1.callMethod({ method: 'changeUserName' })
      expect((model1 as any).userName).toEqual('new Name1')
    })
  })
})
