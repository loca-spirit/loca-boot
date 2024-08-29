import { Column, DataModel, ModelBase } from 'loca-boot-core'

export class BigDataItem1 extends ModelBase {
  @Column({ primary: true })
  public id!: string

  @Column()
  public message!: string

  @Column({ trim: true })
  public name!: string
}
