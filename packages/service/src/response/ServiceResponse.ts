import { Column, createModel, ModelBase } from '@model-base/core'
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

  constructor(dto?: any, wrapper?: DataWrapper | (new (dto: any) => T) | T[], isInit = false) {
    super(dto, { __isInit: isInit })
    if (!isInit) {
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
        if (classType) {
          this.data = classType.create(dto && dto.data)
        }
      }
    }
  }

  public static createResponse<T = any>(dto?: any, wrapper?: DataWrapper | (new (dto: any) => T) | T[]) {
    // const serviceResponse = new ServiceResponse<T>(dto, wrapper, true)
    // 强制调用create，仅仅为了初始化column上面的字段，其余逻辑都在parseData中处理。
    const serviceResponse = (ServiceResponse as any).create(dto, wrapper)
    serviceResponse.parseData(dto, wrapper)
    return serviceResponse as ServiceResponse<T>
  }

  public isValid() {
    return this.resultCode === 'success'
  }
}
