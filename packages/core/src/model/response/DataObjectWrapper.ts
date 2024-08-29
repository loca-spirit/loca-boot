import { DataWrapper } from './DataWrapper'


export class DataObjectWrapper extends DataWrapper {
  static className = 'DataObjectWrapper'
  protected itemType!: any
  protected itemTypeIsArray?: boolean
  protected isPlainData?: boolean

  constructor(data?: {
    itemType: any,
    itemTypeIsArray: boolean,
    isPlainData?: boolean,
  }) {
    super()
    if (data) {
      this.isPlainData = data.isPlainData
      this.itemTypeIsArray = data.itemTypeIsArray
      if (data.itemType) {
        this.itemType = data.itemType
      } else {
        this.itemType = data
      }
    }
  }

  public getClassName() {
    return DataObjectWrapper.className
  }

  public getData(dto: any) {
    const obj = dto
    const newObj = {} as any
    if (obj) {
      Object.keys(obj).forEach((property) => {
        const humpProp = property.replace(/_(\w)/g, function (all: string, letter: string) {
          return letter.toUpperCase()
        })
        const key = this.isPlainData ? property : humpProp
        if (this.itemTypeIsArray) {
          if (dto[property]) {
            newObj[key] = []
            dto[property].forEach((itemDto: any) => {
              newObj[key].push(this.itemType ? new this.itemType(itemDto) : itemDto)
            })
          }
        } else {
          newObj[key] = this.itemType ? new this.itemType(dto[property]) : dto[property]
        }
      })
    }
    return newObj
  }
}
