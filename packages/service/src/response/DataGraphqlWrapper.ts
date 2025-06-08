import { DataWrapper } from './DataWrapper'

export class DataGraphqlWrapper extends DataWrapper {
  static className = 'DataGraphqlWrapper'
  protected itemType!: any
  protected mappingType!: { [key: string]: any }

  constructor(
    data?:
      | {
          itemType: any
          mappingType: { [key: string]: any } | any
        }
      | any,
  ) {
    super()
    if (data) {
      if (data.itemType) {
        this.itemType = data.itemType
      } else if (data.mappingType) {
        this.mappingType = data.mappingType
      } else {
        this.itemType = data
      }
    }
  }

  public getClassName() {
    return DataGraphqlWrapper.className
  }

  public getData(dto: any) {
    let obj = dto
    if (obj) {
      Object.keys(obj).forEach((property) => {
        const humpProp = property.replace(/_(\w)/g, function (all: string, letter: string) {
          return letter.toUpperCase()
        })
        if (this.itemType) {
          obj = this.itemType.create(dto[property])
          delete obj[property]
        }
        if (this.mappingType) {
          obj[humpProp] = this.mappingType[humpProp].create(dto[property])
          if (humpProp !== property) {
            delete obj[property]
          }
        }
      })
    }
    return obj
  }
}
