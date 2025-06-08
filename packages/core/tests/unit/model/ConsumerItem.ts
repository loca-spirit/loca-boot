import { Column, DataModel, ModelBase } from '@model-base/core'

@DataModel({
  methods: {
    init: () => {},
  },
})
export class ConsumerItem extends ModelBase {
  @Column({ primary: true })
  public id!: string

  @Column()
  public message!: string

  @Column()
  public testMy!: string

  @Column({ trim: true })
  public name!: string

  init() {
    this.id = 'id_'
    this.message = 'message'
  }
}
