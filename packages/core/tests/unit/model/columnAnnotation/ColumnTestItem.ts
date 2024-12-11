import { Column, ModelBase } from 'loca-boot-core'

export class ColumnTestItem extends ModelBase {
  @Column()
  public message!: string
}
