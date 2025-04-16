import { Column, ModelBase } from 'loca-boot-core'

export class ColumnTestParent extends ModelBase {
  @Column()
  public tst!: string
}
