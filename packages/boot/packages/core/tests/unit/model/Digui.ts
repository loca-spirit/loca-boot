import { Column, DataModel, ModelBase } from 'loca-boot-core'

export class Test extends ModelBase {
  // 字段code
  @Column()
  public code!: string

  // 数据字典
  @Column({ aliasName: 'dict_data', childType: Test })
  public children!: Test

  // 数据字典
  @Column({ aliasName: 'dict_data', childType: Test })
  public children1!: Test[]
}
export class CommonOptionModel extends ModelBase {
  // 字段code
  @Column()
  public code!: string

  // 数据字典
  @Column({ aliasName: 'dict_data', childType: CommonOptionModel })
  public children!: CommonOptionModel[]

  // 数据字典
  @Column({ aliasName: 'dict_data', childType: CommonOptionModel })
  public children1!: CommonOptionModel
}

export class Digui extends ModelBase {
  @Column()
  public id?: number

  @Column({ model: Digui, autowired: true })
  public consumerList!: Digui[]

  @Column({ model: Digui })
  public consumerList1!: Digui

  // 条件判定的目标字段
  @Column({ childType: CommonOptionModel, autowired: true })
  sourceFields!: CommonOptionModel[]
}
