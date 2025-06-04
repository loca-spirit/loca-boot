import { Column, DataModel, ModelBase } from '@model-base/core'

export class ColumnCamelCaseItem extends ModelBase {
  @Column()
  public message!: string
}
