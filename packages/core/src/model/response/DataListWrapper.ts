import { DataWrapper } from './DataWrapper'

export class DataListWrapper extends DataWrapper {
  static className = 'DataListWrapper'

  protected itemType!: any

  constructor(
    data?:
      | {
          itemType: any
        }
      | any,
  ) {
    super()
    if (data) {
      if (data.itemType) {
        this.itemType = data.itemType
      } else {
        this.itemType = data
      }
    }
  }

  getClassName() {
    return DataListWrapper.className
  }

  public getData(dto: any) {
    const arr = [] as any
    if (Array.isArray(dto)) {
      dto.forEach((data: any) => {
        arr.push(new this.itemType(data))
      })
    }
    return arr
  }
}
