import { type ServiceResponse } from './ServiceResponse'

export abstract class Wrapper<T = unknown> {
  public static isDataWrapper = true

  public data?: T

  public processParams?(params?: any): any {
    return params
  }

  public abstract processData(response: ServiceResponse, dto: any): unknown
}
