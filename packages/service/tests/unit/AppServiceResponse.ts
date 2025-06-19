import { Column } from '@model-base/core'
import { DataWrapper, ServiceResponse } from '@model-base/service'

export class AppServiceResponse<T = any> extends ServiceResponse {
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

  @Column({ aliasName: 'code' })
  public resultCode!: string

  @Column({ aliasName: 'msg' })
  public message!: string

  @Column()
  public encryptType!: number

  @Column({ name: 'data', aliasName: 'resultData' })
  public data!: T

  public serviceError!: Error

  public static createResponse<T = any>(dto?: any, wrapper?: DataWrapper | (new (dto: any) => T) | T[]) {
    const serviceResponse = new AppServiceResponse<T>(dto, wrapper, true)
    serviceResponse.parseData(dto, wrapper)
    return serviceResponse as AppServiceResponse<T>
  }

  public isValid() {
    return String(this.resultCode) === '0'
  }
}
