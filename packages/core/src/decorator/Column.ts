import { __COLUMNS__, __MODEL__, __VERSION__ } from '../constant'
import { toRaw } from '../utils/lib'
import { createModelByDTO } from '../utils/ModelBaseUtil'
import { IColumn, IColumnInner } from './types'

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

function initColumn(target: any, params: IColumnInner, property_: string | symbol, columns_: any) {
  let property = property_
  const columns = columns_
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
  // const designType = Reflect.getMetadata('design:type', target, property)
  if (params.type === 'array') {
    params.type = Array
  }
  let childType
  if (params.childType) {
    childType = params.childType
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
    type: params.type,
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
  return columns
}

interface ClassFieldDecoratorContext<This = unknown, Value = unknown> {
  /** The kind of class element that was decorated. */
  readonly kind: 'field'

  /** The name of the decorated class element. */
  readonly name: string | symbol

  /** A value indicating whether the class element is a static (`true`) or instance (`false`) element. */
  readonly static: boolean

  /** A value indicating whether the class element has a private name. */
  readonly private: boolean

  /** An object that can be used to access the current value of the class element at runtime. */
  readonly access: {
    /**
     * Determines whether an object has a property with the same name as the decorated element.
     */
    has(object: This): boolean

    /**
     * Gets the value of the field on the provided object.
     */
    get(object: This): Value

    /**
     * Sets the value of the field on the provided object.
     */
    set(object: This, value: Value): void
  }

  /**
   * Adds a callback to be invoked immediately after the field being decorated
   * is initialized (regardless if the field is `static` or not).
   */
  addInitializer(initializer: (this: This) => void): void

  readonly metadata: DecoratorMetadata
}

declare type PropertyDecorator = (target: any, propertyKey: string | symbol | ClassFieldDecoratorContext) => void
declare type PropertyDecoratorOld = (target: any, propertyKey: string | symbol) => void
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
  const params = col as IColumnInner
  return (target: any, context: string | symbol | ClassFieldDecoratorContext<typeof target, any>) => {
    if (target?.constructor) {
      ;(target.constructor as any)[__VERSION__] = 'old'
      const params = col as IColumnInner
      const columns = (target.constructor as any)[__COLUMNS__] || {}
      ;(target.constructor as any)[__COLUMNS__] = initColumn(target, params, context as string | symbol, columns)
    } else {
      const property = (context as ClassFieldDecoratorContext<typeof target, any>).name
      ;(context as any).metadata = (context as any).metadata || {}
      const columns = (context as any).metadata[__COLUMNS__] || {}

      ;(context as any).metadata[__COLUMNS__] = initColumn((context as any).metadata, params, property, columns)
      return function (this: any, value: any) {
        const name = (context as any).name
        if (typeof value === 'undefined' || typeof this[name] !== 'undefined') {
          return this[name]
        }
        return value
      }
    }
  }
}

export function ColumnOld(col?: IColumn): PropertyDecoratorOld {
  return (target: any, property: string | symbol) => {
    console.log('ColumnOld', col)
    const params = col as IColumnInner
    const metadata = (target.constructor as any)[Symbol.metadata] || {}
    const columns = (target.constructor as any)[__COLUMNS__] || metadata[__COLUMNS__] || {}
    const columns_ = initColumn(target, params, property, columns)
    ;(target.constructor as any)[__COLUMNS__] = columns_
    metadata[__COLUMNS__] = columns_
    ;(target.constructor as any)[Symbol.metadata] = metadata
    // createModelByDTO<typeof target>(target, { [property]: columns[property] }, target.__value__, target.__options__)
  }
}
