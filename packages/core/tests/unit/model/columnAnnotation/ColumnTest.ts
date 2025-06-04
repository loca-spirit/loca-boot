import { Column, ModelBase } from '@model-base/core'
import { setDefaultList } from '../../util'
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
    default: setDefaultList,
  })
  public consumerList!: ColumnTestItem[]
}
