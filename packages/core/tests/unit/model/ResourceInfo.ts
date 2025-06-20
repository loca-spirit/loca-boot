import { Column, ModelBase } from '@model-base/core'

export class ResourceInfo extends ModelBase {
  @Column()
  public resourceId!: string

  @Column()
  public isOnline!: boolean

  @Column()
  public resourceType!: string

  @Column()
  public description!: string
}
