import { Column, ModelBase } from '@model-base/core'
// region model
export class Consumer extends ModelBase {
  @Column({ aliasName: 'user_age' })
  public age?: string

  @Column({ aliasName: 'user_name' })
  public name?: string
}
// endregion model