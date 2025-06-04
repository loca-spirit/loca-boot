import { AliseName } from './model/AliseName'
import { CLEAN_ENUM } from '@model-base/core'

describe('Null Value', () => {
  it('null', () => {
    const c = new AliseName({ uName1: null, user_name2: null })
    expect(
      c.getSerializableObject({ clean: CLEAN_ENUM.CLEAN_UNDEFINED })
    ).toEqual({ u_name1: null, u_name2: null })
    expect(c).toEqual({ uName1: null, uName2: null })
  })
})
