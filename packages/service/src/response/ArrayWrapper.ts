import { type ServiceResponse } from './ServiceResponse'
import { Wrapper } from './Wrapper'

export class ArrayWrapper<T> extends Wrapper {
  protected model?: T

  public data?: T

  constructor(data?: { model: T } | any) {
    super()
    this.model = data?.model || data
  }

  public processData(response: ServiceResponse, res: any) {
    const dto = res.data
    const data_ = (this.data = [] as any)
    if (Array.isArray(dto)) {
      dto.forEach((data: any) => {
        data_.push((this.model as any).create(data) as T)
      })
    }
    response.data = this.data
  }
}
