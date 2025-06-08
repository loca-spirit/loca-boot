import { Column, ModelBase } from '@model-base/core'
import { cloneDeep } from 'lodash'
class UserModel extends ModelBase {
  @Column()
  public userNameA?: string

  @Column({ default: 'shuai.meng' })
  public userNameB?: string
}

describe('cloneDeep', () => {
  it('cloneDeep', () => {
    const c = new UserModel({
      userNameA: 'shuai.meng1',
    })
    const clone_ = cloneDeep(c)
    expect(clone_.getCleanSerializableObject()).toEqual({
      user_name_a: 'shuai.meng1',
      user_name_b: 'shuai.meng',
    })
    expect(clone_).toEqual({ userNameA: 'shuai.meng1', userNameB: 'shuai.meng' })
  })

  it('cloneDeep with noDefault options', () => {
    const c = new UserModel(
      {
        userNameA: 'shuai.meng1',
      },
      { noDefault: true },
    )
    const clone_ = cloneDeep(c)
    expect(clone_.getCleanSerializableObject()).toEqual({
      user_name_a: 'shuai.meng1',
    })
    expect(clone_).toEqual({ userNameA: 'shuai.meng1' })
  })
})
