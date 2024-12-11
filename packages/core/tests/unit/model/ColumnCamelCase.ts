import { Column, DataModel, ModelBase } from 'loca-boot-core'
import { ColumnCamelCaseItem } from './ColumnCamelCaseItem'

export class ColumnCamelCase extends ModelBase {
  @Column()
  public userName!: string

  @Column({
    default: () => {
      return []
    },
  })
  public list!: string[]

  @Column({
    model: ColumnCamelCaseItem,
    default: () => {
      return []
    },
  })
  public consumerList!: ColumnCamelCaseItem[]
}
