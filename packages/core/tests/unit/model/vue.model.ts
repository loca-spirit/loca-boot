import { Column, DataModel, ModelBase } from 'loca-boot-core'

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
    autowired: true,
  })
  public list!: string[]
  @Column({
    model: () => VueChildModel,
    autowired: true,
  })
  public listModel!: VueChildModel[]
}
