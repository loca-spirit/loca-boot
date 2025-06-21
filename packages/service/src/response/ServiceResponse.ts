import { type IModelOptions, Column, ModelBase } from '@model-base/core'
import { type Wrapper } from './Wrapper'
import { type WrapperType } from '../CoreService'

export class ServiceResponse<T = unknown> extends ModelBase {
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
  public data!: WrapperType<T>

  public serviceError!: Error

  constructor(dto?: any, options?: IModelOptions, wrapper?: Wrapper | (new (dto: any) => T) | T[]) {
    super(dto, options)
    if (!options?.__isInit) {
      this.parseData(dto, wrapper)
    }
  }

  public processParams(params?: any) {
    return params
  }

  public parseData(dto?: any, wrapper?: Wrapper | (new (dto: any) => T) | T[]) {
    // 支持：type，支持[item]
    if (wrapper) {
      if ((wrapper as Wrapper).constructor.prototype.constructor.isDataWrapper) {
        (wrapper as Wrapper).processData(this, dto)
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
