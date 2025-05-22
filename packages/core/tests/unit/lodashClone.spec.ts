import { cloneDeep } from 'lodash'
import { AliseName } from './model/AliseName'

describe('cloneDeep', () => {
  it('cloneDeep', () => {
    const c = new AliseName({
      userName1: 'shuai.meng1',
      user_name2: 'shuai.meng2',
    })
    const clone_ = cloneDeep(c)
    expect(clone_.getCleanSerializableObject()).toEqual({
      u_name1: 'shuai.meng1',
      u_name2: 'shuai.meng2',
    })
    expect(clone_).toEqual({ uName1: 'shuai.meng1', uName2: 'shuai.meng2' })
  })
})
