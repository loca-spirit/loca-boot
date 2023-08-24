import { ModelBase, createModel } from 'loca-boot-core'
import { Consumer } from './model/Consumer'
import { Digui } from './model/Digui'

describe('create Model', () => {
  it('create Model test.', async () => {
      const model = createModel(
        {
          id: 1,
          userName: '212',
          ...{
            aliseName: 1,
            name: '212',
          },
        },
        Consumer)
      const model1 = createModel(
        {
          id: 1,
        },
        Digui)
      model.getChangedData()
    },
  )
})
