import { Column, DataModel, ModelBase } from '@model-base/core'
import { ConsumerItem } from './ConsumerItem'

export
@DataModel({
  methods: {
    changeUserName: '{{$model.userName = "new Name"}}',
  },
})
class Consumer extends ModelBase {
  @Column()
  public id?: number
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
    model: () => ConsumerItem,
    default: () => [],
  })
  public consumerList!: ConsumerItem[]
  @Column({
    model: () => ConsumerItem,
  })
  public consumerObject!: ConsumerItem
  @Column()
  public consumerObjectMap!: Record<string, ConsumerItem>
  init() {
    this.userName = this.consumerObject.id + this.consumerObject.message
  }
}
