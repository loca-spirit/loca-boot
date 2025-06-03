import { __MODEL__ } from '../constant'
import { Column } from '../decorator/Column'
import type { IColumnDefined, IDataModel } from '../decorator/types'
import { IModelOptions } from '../utils/ModelBaseUtil'
import { ModelBase } from './ModelBase'

export function genType(typeStr: string, column: IColumnDefined) {
  let designType
  switch (typeStr) {
    case 'array':
      // 如果model传入的是class，不需要二次转换model为dynamicModelBase了。
      if (column.model && typeof column.model !== 'function') {
        column.model = dynamicModelBase(column.model)
      }
      designType = Array
      break
    case 'object':
      // 如果model传入的是class，不需要二次转换model为dynamicModelBase了。
      if (column.model && typeof column.model !== 'function') {
        column.model = dynamicModelBase(column.model)
      }
      // 如果传入的数据是普通的Object。
      if (!column.model) {
        designType = Object
      }
      break
    case 'number':
      designType = Number
      break
    case 'string':
      designType = String
      break
    case 'boolean':
      designType = Boolean
      break
    case 'map':
      designType = Map
      break
    case 'weakMap':
      designType = WeakMap
      break
    case 'set':
      designType = Set
      break
    case 'weakSet':
      designType = WeakSet
      break
    case 'symbol':
      designType = Symbol
      break
    case 'function':
      designType = Function
      break
    case 'file':
      designType = File
      break
    default:
      designType = column.model
  }
  return designType
}

type Model<T> = T extends ModelBase ? ModelBase : T

export function dynamicModelBase<T = ModelBase>(
  columnObj: {
    [key: string]: IColumnDefined
  },
  params?: IDataModel,
) {
  class CustomDefinedModel extends ModelBase {
    constructor(dto?: any, options?: IModelOptions) {
      super(dto, options)
    }
  }

  Object.keys(columnObj).forEach((key) => {
    const column = columnObj[key]
    const typeStr = column.type || 'string'
    column.name = column.name || key
    const type = genType(typeStr, column)
    Reflect.defineMetadata('design:type', type, CustomDefinedModel.prototype, key)
    Column(column)(CustomDefinedModel.prototype, key)
  })
  if (params?.methods) {
    const model = {
      methods: params?.methods || {},
    } as IDataModel
    ;(CustomDefinedModel.prototype.constructor as any)[__MODEL__] = model
  }
  return CustomDefinedModel as any as new (dto?: any, options?: IModelOptions) => Model<T>
}
