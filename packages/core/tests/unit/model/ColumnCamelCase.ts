import { Column, DataModel, ModelBase } from '@model-base/core'
import { ColumnCamelCaseItem } from './ColumnCamelCaseItem'

export class ColumnCamelCase extends ModelBase {
  @Column()
  public userName!: string
  @Column({
    default: () => [],
  })
  public list!: string[]
  @Column({
    model: () => ColumnCamelCaseItem,
    default: () => [],
  })
  public consumerList!: ColumnCamelCaseItem[]
}
