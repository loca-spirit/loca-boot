import { Driver } from './Driver'

/**
 * @description BaseApi
 */
export class BaseApi {
  public driver!: Driver
  constructor(adapter: Driver) {
    this.driver = adapter
  }
}
