import { Column, DataModel, ModelBase } from 'loca-boot-core'

@DataModel({
    enableDataState: false,
  },
)
export class BigDataItem extends ModelBase {
  @Column({ primary: true })
  public id!: string

  @Column()
  public message!: string

  @Column({ trim: true })
  public name!: string
}
