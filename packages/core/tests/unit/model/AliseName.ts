import { Column, ModelBase } from '@model-base/core'

export class AliseName extends ModelBase {
  @Column({ aliasName: 'userName1' })
  public uName1?: string

  @Column({ aliasName: 'user_name2' })
  public uName2?: string
}
