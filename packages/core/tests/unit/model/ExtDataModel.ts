import { Column, ModelBase } from '@model-base/core'

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
