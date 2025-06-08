import { Column, DataModel, ModelBase } from '@model-base/core'
import { BigDataItem } from './BigDataItem'

export
@DataModel({
  enableDataState: false,
})
class BigData extends ModelBase {
  @Column({
    trim: true,
  })
  public userName?: string
  @Column()
  public user_xx?: string
  @Column()
  public phoneNumber!: string
  @Column({
    default: () => [],
  })
  public list!: string[]
  @Column({
    model: () => BigDataItem,
    default: () => [],
  })
  public consumerList!: BigDataItem[]
  @Column({
    model: () => BigDataItem,
  })
  public consumerObject!: BigDataItem
}
