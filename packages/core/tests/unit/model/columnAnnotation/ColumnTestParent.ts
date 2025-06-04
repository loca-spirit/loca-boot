import { Column, ModelBase } from '@model-base/core'

export class ColumnTestParent extends ModelBase {
  @Column()
  public tst!: string
}
