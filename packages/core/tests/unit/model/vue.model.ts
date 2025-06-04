import { Column, DataModel, ModelBase } from '@model-base/core'

export class VueChildModel extends ModelBase {
  @Column()
  public id?: number

  @Column()
  public userName?: string
}

export class VueModel extends ModelBase {
  @Column()
  public id?: number
  @Column({
    trim: true,
  })
  public userName?: string
  @Column()
  public phoneNumber!: string
  @Column({
    default: () => [],
  })
  public list!: string[]
  @Column({
    model: () => VueChildModel,
    default: () => [],
  })
  public listModel!: VueChildModel[]
}
