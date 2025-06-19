import { type IModelOptions, Column, ModelBase } from '@model-base/core'
import { DataGraphqlWrapper } from './DataGraphqlWrapper'
import { DataListWrapper } from './DataListWrapper'
import { DataObjectWrapper } from './DataObjectWrapper'
import { DataStreamWrapper } from './DataStreamWrapper'
import { DataWrapper } from './DataWrapper'

export class ServiceResponse<T = any> extends ModelBase {
  @Column()
  public serverTime!: number

  @Column()
  public requestId!: string

  @Column()
  public config!: any

  @Column()
  public headers!: any

  @Column()
  public request!: any

  @Column()
  public driverType!: string

  @Column()
  public status!: number

  @Column()
  public statusText!: string

  @Column()
  public resultCode!: string

  @Column()
  public message!: string

  @Column()
  public encryptType!: number

  @Column({ name: 'data', aliasName: 'resultData' })
  public data!: T

  public serviceError!: Error

  constructor(dto?: any, options?: IModelOptions, wrapper?: DataWrapper | (new (dto: any) => T) | T[]) {
    super(dto, options)
    if (!options?.__isInit) {
      this.parseData(dto, wrapper)
    }
  }

  public parseData(dto?: any, wrapper?: DataWrapper | (new (dto: any) => T) | T[]) {
    // 支持：type，支持[item]
    if (wrapper) {
      if ((wrapper as any).getClassName && (wrapper as any).getClassName() === DataGraphqlWrapper.className) {
        this.data = (wrapper as DataWrapper).getData(this.data) as any
      } else if ((wrapper as any).getClassName && (wrapper as any).getClassName() === DataListWrapper.className) {
        this.data = (wrapper as DataWrapper).getData(this.data) as any
      } else if ((wrapper as any).getClassName && (wrapper as any).getClassName() === DataObjectWrapper.className) {
        this.data = (wrapper as DataWrapper).getData(this.data) as any
      } else if ((wrapper as any).getClassName && (wrapper as any).getClassName() === DataStreamWrapper.className) {
        // content-type 不存在或者 不包含 application/json，则按照 blob的处理方式处理。
        if (!dto?.headers?.['content-type'] || dto?.headers?.['content-type']?.indexOf('application/json') === -1) {
          // stream默认是没有data属性，dto需要设置到data上
          this.data = dto
          if (this.data) {
            this.data = (wrapper as DataWrapper).getData(this.data) as any
            this.resultCode = this.resultCode || 'success'
          } else {
            this.resultCode = 'stream_is_empty'
          }
        }
      } else {
        const classType = wrapper as any
        if (classType && classType.isModelBase) {
          this.data = classType.create(dto && dto.data)
        }
      }
    }
  }

  public static create(dto?: any, wrapper?: any, ...rest: any) {
    const t_ = super.create<any>(dto, {}, wrapper)
    t_.parseData(dto, wrapper)
    return t_
  }

  public isValid() {
    return this.resultCode === 'success'
  }
}
