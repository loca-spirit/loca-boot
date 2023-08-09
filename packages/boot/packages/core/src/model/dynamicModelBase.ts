import { ModelBase } from './ModelBase'
import { Column, IColumnDefined, IDataModel, LOCA_DATA_MODEL_KEY } from '../decorator'
import { IModelOptions } from '../utils/ModelBaseUtil'


export function genType(typeStr: string, column: IColumnDefined) {
  let type
  switch (typeStr) {
    case 'array':
      if (column.model) {
        column.model = dynamicModelBase(column.model)
      }
      type = Array
      break
    case 'object':
      type = dynamicModelBase(column.model)
      break
    case 'number':
      type = Number
      break
    case 'string':
      type = String
      break
    case 'boolean':
      type = Boolean
      break
    case 'map':
      type = Map
      break
    case 'weakMap':
      type = WeakMap
      break
    case 'set':
      type = Set
      break
    case 'weakSet':
      type = WeakSet
      break
    case 'symbol':
      type = Symbol
      break
    case 'function':
      type = Function
      break
    case 'file':
      type = File
      break
    default:
      type = column.model
  }
  return type
}

export function dynamicModelBase(columnObj: { [key: string]: IColumnDefined }, params?: IDataModel) {
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
    Reflect.defineMetadata(
      'design:type',
      type,
      CustomDefinedModel.prototype,
      column.name as string,
    )
    Column(column)(CustomDefinedModel.prototype, column.name as string)
  })
  if (params?.methods) {
    const model = {
      methods: params?.methods || {},
    } as IDataModel
    Reflect.defineMetadata(
      LOCA_DATA_MODEL_KEY,
      model,
      CustomDefinedModel.prototype.constructor,
    )
  }
  return CustomDefinedModel as any as new(dto?: any, options?: IModelOptions) => ModelBase
}
