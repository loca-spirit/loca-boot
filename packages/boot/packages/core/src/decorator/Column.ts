import 'reflect-metadata'
import { LOCA_DATA_MODEL_KEY, IDataModel } from './DataModel'

export const LOCA_COLUMN_KEY = Symbol('locaColumnKey')
export const MODEL_COLUMN_KEY = Symbol('modelColumnKey')
export const CLONE_KEY = Symbol('__CLONE__')

export interface IColumn {
  name?: string;
  aliasName?: string | symbol;
  childType?: any;
  group?: string | string[];
  model?: any;
  formatter?: any;
  trim?: boolean;
  primary?: boolean;
  foreign?: boolean;
  default?: any;
  autowired?: boolean;
  unformatter?: any;
}

export interface IColumnDefined extends IColumn {
  type?: any;
}

export interface IColumnInner extends IColumn {
  camelCaseName: string | symbol;
  type: any;
  column: any;
}

export function genTypeByValue(value: any) {
  let type = Object as any
  let typeOfValue = typeof value
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
  const m = Reflect.getOwnMetadata(
    LOCA_DATA_MODEL_KEY,
    model.constructor,
  )

  let keys = Object.keys(data)
  const columns_ = {} as { [key: string]: IColumnInner }

  if (keys.length) {
    if (m?.columnsInValue) {
      keys.forEach((key) => {
        columns_[key] = {
          camelCaseName: key, // model name
          type: genTypeByValue((data as any)[key]),
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
    let columns = Reflect.getOwnMetadata(
      LOCA_COLUMN_KEY,
      target,
    )
    columns = columns || {}
    if (!params) {
      params = { camelCaseName: property, column: undefined, type: undefined }
    }
    // 兼容childType，新的名字为model
    params.childType = params.childType || params.model
    if (params && !params.hasOwnProperty('name')) {
      if (typeof property === 'symbol') { // symbol是可以作为属性key的
        property = property.toString()
      }
      params.name = genUnderlinePropName(property)
      // 如果 property 自己定义的名字不符合驼峰规范则不做强制改变。
      params.camelCaseName = property
    }
    const type = Reflect.getMetadata('design:type', target, property)
    // @ts-ignore
    const File = File || Object // 小程序不支持 File对象，按照Object去处理
    let childType
    switch (type) {
      case Array:
        if (params.childType) {
          childType = params.childType
        }
        break
      case Object:
      case Number:
      case String:
      case Boolean:
      case Map:
      case WeakMap:
      case Set:
      case WeakSet:
      case Symbol:
      case Function:
      case File:
        break
      default:
        // 除了基本类型之外，其他的复杂类型（class等）都是设置为 type
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
      formatter: params.formatter,
      trim: params.trim,
      primary: params.primary,
      foreign: params.foreign,
      default: params.default,
      autowired: params.autowired,
      unformatter: params.unformatter,
      childType,
    }
    Reflect.defineMetadata(
      LOCA_COLUMN_KEY,
      columns,
      target,
    )
  }
}
