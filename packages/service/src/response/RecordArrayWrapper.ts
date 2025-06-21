import { type ServiceResponse } from './ServiceResponse'
import { Wrapper } from './Wrapper'

export class RecordArrayWrapper<T> extends Wrapper {
  protected model!: any
  protected camelCaseKey?: boolean
  public data?: { [key: string]: T }

  constructor(data?: { model: any; camelCaseKey?: boolean }) {
    super()
    if (data) {
      this.camelCaseKey = data.camelCaseKey
      if (data.model) {
        this.model = data.model
      } else {
        this.model = data
      }
    }
  }

  public processData(response: ServiceResponse, res: any) {
    const dto = res.data
    this.data = {}
    if (dto) {
      Object.keys(dto).forEach((property) => {
        const humpProp = property.replace(/_(\w)/g, function (all: string, letter: string) {
          return letter.toUpperCase()
        })
        const key = this.camelCaseKey ? property : humpProp
        const data_ = this.data as { [key: string]: any[] }
        if (dto[property]) {
          data_[key] = []
          dto[property].forEach((itemDto: any) => {
            data_[key].push(this.model ? this.model.create(itemDto) : itemDto)
          })
        }
      })
    }
    response.data = this.data
  }
}
