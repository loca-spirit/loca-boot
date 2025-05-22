import { Column, DataModel, ModelBase } from 'loca-boot-core'
import { BigDataItem } from './BigDataItem'

@DataModel({
  enableDataState: false,
})
export class BigData extends ModelBase {
  @Column({ trim: true })
  public userName?: string

  @Column()
  public user_xx?: string

  @Column()
  public phoneNumber!: string

  @Column({ default: true })
  public list!: string[]

  @Column({ model: () => BigDataItem, autowired: true })
  public consumerList!: BigDataItem[]

  @Column({ model: () => BigDataItem })
  public consumerObject!: BigDataItem
}
