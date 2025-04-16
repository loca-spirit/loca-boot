import { ExtDataModel } from './model/ExtDataModel'

describe('ExtDataModel', () => {
  describe('ExtDataModel', () => {
    it('ExtDataModel', () => {
      const c = new ExtDataModel({
        userName1: 'shuai.meng1',
        user_name2: 'shuai.meng2',
      })
      const col = c.getColumns()
      console.log(c.getColumns())
    })
  })
})
