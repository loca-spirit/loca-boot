import { Column, ModelBase } from 'loca-boot-core'

export class GroupData extends ModelBase {
  @Column()
  public emptyGroup?: string

  @Column({ group: 'group1' })
  public data1?: string

  @Column({ group: ['group1'] })
  public data2?: string

  @Column({ group: ['group1', 'group2', 'group3'] })
  public data3?: string

  @Column({ group: 'group2' })
  public data4?: string

  @Column()
  public data5?: string

  @Column()
  public data6?: string
}
