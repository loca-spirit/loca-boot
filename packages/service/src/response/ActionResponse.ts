import { ServiceResponse } from './ServiceResponse'

export class ActionResponse<T = any> extends ServiceResponse {
  constructor(res: ServiceResponse<T>, resolve?: (res: ServiceResponse<T>) => void, reject?: any) {
    super()
    if (res.isValid()) {
      resolve && resolve.call(null, res)
    } else {
      reject && new reject(res)
    }
    return res
  }
}
