import 'reflect-metadata'
import { __COLUMNS__, __MODEL__ } from '../constant'

export interface IColumn {
  name?: string
  aliasName?: string | symbol
  childType?: any
  group?: string | string[]
  model?: any
  formatter?: any
  serialize?: (
    data: {
      value: any
      key: string
      data: any
    },
  ) => any
  trim?: boolean
  primary?: boolean
  foreign?: boolean
  default?: any
  autowired?: boolean
  unformatter?: any
  deserialize?: (
    data: {
      value: any
      key: string
      data: any
    },
  ) => any
  extData?: any
}

export interface IColumnDefined extends IColumn {
  type?: any
}

export interface IColumnInner extends IColumn {
  camelCaseName: string | symbol
  type: any
  column: any
}

export function genTypeByValue(value: any) {
  let type = Object as any
  const typeOfValue = typeof value
  if (typeOfValue === 'number') {
    type = Number
  }
  if (typeOfValue === 'string') {
    type = String
  }
  if (typeOfValue === 'boolean') {
    type = Boolean
  }
  if (Array.isArray(value)) {
    type = 'array'
  }
  return type
}

function genUnderlinePropName(property: string) {
  let underlineProp = ''
  for (const char of property) {
    if (/[A-Z]/.test(char)) {
      underlineProp += '_'
      underlineProp += char.toLowerCase()
    } else {
      underlineProp += char
    }
  }
  return underlineProp
}

export function generateColumnsFromData(model: any, data: any) {
  const m = (model.constructor as any)[__MODEL__] || {}

  const keys = Object.keys(data)
  const columns_ = {} as { [key: string]: IColumnInner }

  if (keys.length) {
    if (m?.columnsInValue) {
      keys.forEach((key) => {
        columns_[key] = {
          camelCaseName: key, // model name
          type: genTypeByValue((data as any)[key]),
          // 正常column是从name上获取值，但是因为是通过value进行推断，所以没法传入name，只能全局设置，否则默认就是下划线的column。
          column: m?.keepModelName ? key : genUnderlinePropName(key), // serialized name
        }
      })
    }
  }
  return columns_
}

/**
 * @description 设置 primary 的主键的值只能是 string | number, 主键的值理论上不允许为空
 *
 * @description
 *
 * number serialized as Number
 * string serialized as String
 * boolean serialized as Boolean
 * any serialized as Object
 * void serializes as undefined
 * Array serialized as Array
 * If a Tuple, serialized as Array
 * If a class serialized it as the class constructor
 * If an Enum serialized it as Number
 * If has at least one call signature, serialized as Function
 * Otherwise serialized as Object (Including interfaces)
 *
 * @constructor
 * @param col
 */
export function Column(col?: IColumn): PropertyDecorator {
  let params = col as IColumnInner
  return (target: any, property: string | symbol) => {
    const columns = (target.constructor as any)[__COLUMNS__] || {}
    if (!params) {
      params = { camelCaseName: property, column: undefined, type: undefined }
    }
    // 兼容childType，新的名字为model
    params.childType = params.childType || params.model
    if (params && !params.hasOwnProperty('name')) {
      if (typeof property === 'symbol') {
        // symbol是可以作为属性key的
        property = property.toString()
      }
      params.name = genUnderlinePropName(property)
      // 如果 property 自己定义的名字不符合驼峰规范则不做强制改变。
      params.camelCaseName = property
    }
    const type = Reflect.getMetadata('design:type', target, property)
    let childType
    if (params.childType) {
      childType = params.childType
    } else if (type?.isModelBase) {
      childType = type
    }
    let g: any
    if (Array.isArray(params.group)) {
      g = params.group
    } else if (typeof params.group === 'string') {
      g = [params.group]
    } else {
      g = undefined
    }
    columns[property] = {
      column: params.name,
      camelCaseName: params.camelCaseName,
      aliasName: params.aliasName,
      type,
      group: g,
      trim: params.trim,
      primary: params.primary,
      foreign: params.foreign,
      default: params.default,
      autowired: params.autowired,
      formatter: params.formatter,
      unformatter: params.unformatter,
      deserialize: params.deserialize,
      serialize: params.serialize,
      childType,
      extData: params.extData,
    }
    ;(target.constructor as any)[__COLUMNS__] = columns
  }
}
