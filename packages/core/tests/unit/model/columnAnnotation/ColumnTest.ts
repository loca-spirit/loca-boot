import { Column } from '@model-base/core'
import { ColumnTestItem } from './ColumnTestItem'
import { ColumnTestParent } from './ColumnTestParent'

export class ColumnTest extends ColumnTestParent {
  @Column()
  public userName!: string
  @Column({
    autowired: true,
    model: () => ColumnTestItem,
  })
  public obj!: ColumnTestItem
  @Column({
    model: () => ColumnTestItem,
    default: () => [],
  })
  public consumerList!: ColumnTestItem[]
}
