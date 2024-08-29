import { Column, DataModel, ModelBase } from 'loca-boot-core'
import { BigDataItem1 } from './BigDataItem1'

export class BigData1 extends ModelBase {
  @Column({ trim: true })
  public userName?: string

  @Column()
  public user_xx?: string

  @Column()
  public phoneNumber!: string

  @Column({ default: true })
  public list!: string[]

  @Column({ model: BigDataItem1, autowired: true })
  public consumerList!: BigDataItem1[]

  @Column({ model: BigDataItem1 })
  public consumerObject!: BigDataItem1
}
