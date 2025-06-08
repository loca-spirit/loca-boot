import { ServiceResponse } from './ServiceResponse'

export class GraphqlResponse<T = any> extends ServiceResponse<T> {
  public getMessage() {
    return this.message
  }
}
