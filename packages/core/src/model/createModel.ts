import type { IColumnDefined, IDataModel, IModelOptions, ModelSnakeType, ModelType } from '../decorator/types'
import { dynamicModelBase } from './dynamicModelBase'
import { ModelBase } from './ModelBase'

export function createModel<T>(
  model: new (...args: any[]) => T | (() => new (...args: any[]) => T),
  dto: ModelSnakeType<T> & ModelType<T>,
  options?: IModelOptions,
) {
  const options_ = options || {}
  let t_: any
  if ((model as any as typeof ModelBase).isModelBase) {
    t_ = (model as any as typeof ModelBase).create(dto, options_)
  } else {
    t_ = ((model as any)() as typeof ModelBase).create(dto, options_)
  }
  return t_ as T
}

export function createDynamicModel(
  columnObj: { [key: string]: IColumnDefined },
  dto: any,
  modelParams?: IModelOptions,
  params?: IDataModel,
) {
  return (dynamicModelBase(columnObj as any, params) as typeof ModelBase).create(dto, modelParams)
}
