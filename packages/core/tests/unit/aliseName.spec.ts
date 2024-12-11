import { AliseName } from './model/AliseName'

describe('AliseName', () => {
  describe('AliseName', () => {
    it('AliseName', () => {
      const c = new AliseName({
        userName1: 'shuai.meng1',
        user_name2: 'shuai.meng2',
      })
      expect(c.getCleanSerializableObject()).toEqual({
        u_name1: 'shuai.meng1',
        u_name2: 'shuai.meng2',
      })
      expect(c).toEqual({ uName1: 'shuai.meng1', uName2: 'shuai.meng2' })
    })
  })
})
