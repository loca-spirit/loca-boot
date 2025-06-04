import { Column, DataModel, ModelBase } from '@model-base/core'

export class BigDataItem1 extends ModelBase {
  @Column({ primary: true })
  public id!: string

  @Column()
  public message!: string

  @Column({ trim: true })
  public name!: string
}
