import { Column } from '@model-base/core'
import { ServiceResponse } from '@model-base/service'

export class AppServiceResponse extends ServiceResponse {
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
  public data!: any

  public serviceError!: Error

  public isValid() {
    return String(this.resultCode) === '0'
  }
}
