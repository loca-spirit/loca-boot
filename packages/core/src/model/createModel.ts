import { IColumnDefined, IDataModel } from '../decorator'
import { createModelByDTO, IModelOptions, initModel_ } from '../utils/ModelBaseUtil'
import { dynamicModelBase } from './dynamicModelBase'
type Primitive = string | number | boolean | bigint | symbol | null | undefined

export type ExcludeFunction<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>

export type SnakeCase<T> = T extends `${infer F}${infer R}`
  ? F extends Capitalize<F>
    ? `_${Uncapitalize<F>}${SnakeCase<R>}`
    : `${F}${SnakeCase<R>}`
  : T

export type ModelType<T> = {
  [K in keyof ExcludeFunction<T>]?: T[K] extends Primitive ? T[K] : ModelType<T[K]>
}
export type ModelSnakeType<T> = {
  [K in keyof ExcludeFunction<T> as SnakeCase<K>]?: T[K] extends Primitive ? T[K] : ModelSnakeType<T[K]>
}

export function createModel<T>(
  model: new (dto: any, options?: IModelOptions) => T,
  dto: ModelSnakeType<T> & ModelType<T>,
  options?: IModelOptions,
) {
  const options_ = options || {}
  options_.__noInit = true
  const t_ = new model(dto, options_)
  createModelByDTO(t_ as any, (t_ as any).getColumns(), dto, options_)
  return t_ as T
}

export function createDynamicModel(
  columnObj: { [key: string]: IColumnDefined },
  dto: any,
  modelParams?: IModelOptions,
  params?: IDataModel,
) {
  return new (dynamicModelBase(columnObj as any, params))(dto, modelParams)
}
