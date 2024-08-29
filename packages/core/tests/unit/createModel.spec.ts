import { ModelBase, createModel } from 'loca-boot-core'
import { Consumer } from './model/Consumer'

describe('create Model', () => {
  it('create Model test.', async () => {
      const model = createModel(Consumer,
        {
          id: 1,
          userName: 'mengyubo',
        },
      )
      expect(model.id).toBe(1)
      expect(model.userName).toBe('mengyubo')
    },
  )
})
