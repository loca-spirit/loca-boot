import { IColumnDefined, IDataModel } from '../decorator'
import { dynamicModelBase } from './dynamicModelBase'
import { IModelOptions } from '../utils/ModelBaseUtil'

type SnakeCase<T> = T extends `${infer F}${infer R}` ? F extends Capitalize<F> ? `_${Uncapitalize<F>}${SnakeCase<R>}` : `${F}${SnakeCase<R>}` : T
type ExcludeFunction<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>;
type ModelSnakeCase<T> = {
  [K in keyof ExcludeFunction<T> as SnakeCase<K>]?: T[K]
};
type Model<T> = {
  [K in keyof ExcludeFunction<T>]?: T[K]
};

export function createModel<T>(
  model: new(dto: any) => T,
  dto: ModelSnakeCase<T> & Model<T>,
  modelParams?: IModelOptions,
) {
  return new (model as any)(dto, modelParams) as any as T
}

export function createDynamicModel(
  columnObj: { [key: string]: IColumnDefined },
  dto: any,
  modelParams?: IModelOptions,
  params?: IDataModel,
) {
  return new (dynamicModelBase(columnObj as any, params))(dto, modelParams)
}
