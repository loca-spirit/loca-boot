import { Column, DataModel, ModelBase } from 'loca-boot-core'
import { ConsumerItem } from './ConsumerItem'

@DataModel({
    methods: {
      changeUserName: '{{$model.userName = "new Name"}}',
    },
  },
)
export class Consumer extends ModelBase {
  @Column()
  public id?: number

  @Column({ trim: true })
  public userName?: string

  @Column()
  public user_xx?: string

  @Column()
  public phoneNumber!: string

  @Column({ default: true })
  public list!: string[]

  @Column({ model: ConsumerItem, autowired: true })
  public consumerList!: ConsumerItem[]

  @Column({ model: ConsumerItem })
  public consumerObject!: ConsumerItem

  init() {
    this.userName = this.consumerObject.id + this.consumerObject.message
  }
}
