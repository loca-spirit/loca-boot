import { Column, ModelBase } from 'loca-boot-core'
import { setDefaultList } from '../../util'
import { ColumnTestItem } from './ColumnTestItem'
import { ColumnTestParent } from './ColumnTestParent'

export class ColumnTest extends ColumnTestParent {
  @Column()
  public userName!: string
  @Column({
    default: true,
    model: ColumnTestItem,
  })
  public obj!: ColumnTestItem
  @Column({
    model: ColumnTestItem,
    default: setDefaultList,
  })
  public consumerList!: ColumnTestItem[]
}
