import { Column, ModelBase } from 'loca-boot-core'

export class ExtDataModelChild extends ModelBase {
  @Column({ extData: { point: true } })
  public uName1?: string

  @Column({ extData: { point: true } })
  public uName2?: string
}

export class ExtDataModel extends ModelBase {
  @Column({
    extData: {
      point: true,
    },
  })
  public uName1?: string
  @Column({
    extData: {
      point: true,
    },
  })
  public uName2?: string
  @Column({
    extData: {
      point: true,
    },
    model: () => ExtDataModelChild,
  })
  public c1?: ExtDataModelChild
  @Column({
    model: () => ExtDataModelChild,
    extData: {
      point: true,
    },
  })
  public cList?: ExtDataModelChild[]
}
