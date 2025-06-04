import { Column, ModelBase } from '@model-base/core'

export class ColumnTestItem extends ModelBase {
  @Column()
  public message!: string
}
