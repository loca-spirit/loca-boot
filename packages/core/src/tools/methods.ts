import { create } from '../_utils/create'
import { CLEAN_ENUM, type IModelOptions, type TSerializableParam } from '../decorator'
import { ModelBase } from '../model'
import { modelToSerializableObj } from './modelToSerializableObj'

export function deserialize<T extends ModelBase>(
  type: new (dto: any, options?: IModelOptions) => T,
  data: any,
  options?: IModelOptions,
) {
  return create(type)(data?.constructor?.isModelBase ? data.getSerializableObject() : data, options)
}

export function deserializeArray<T extends ModelBase>(
  itemType: new (dto: any, options?: IModelOptions) => T,
  dtos: any[],
  options?: IModelOptions,
) {
  if (!dtos) return
  const list: T[] = []
  dtos.forEach((dto) => list.push(deserialize(itemType, dto, options)))
  return list
}

export function deserializeRecord<T extends ModelBase>(
  itemType: new (dto: any, options?: IModelOptions) => T,
  dtos: { [key: string]: any },
  options?: IModelOptions,
) {
  if (!dtos) return
  return Object.keys(dtos || {}).reduce((acc, property) => {
    acc[property] = deserialize(itemType, dtos[property], options)
    return acc
  }, {} as { [key: string]: T })
}

export function deserializeRecordArray<T extends ModelBase>(
  itemType: new (dto: any, options?: IModelOptions) => T,
  dtos: { [key: string]: any },
  options?: IModelOptions,
) {
  if (!dtos) return
  return Object.keys(dtos || {}).reduce((acc, property) => {
    acc[property] = deserializeArray(itemType, dtos[property], options) || []
    return acc
  }, {} as { [key: string]: T[] })
}

export function serialize(
  data: ModelBase | ModelBase[] | { [key: string]: ModelBase } | { [key: string]: ModelBase[] } | undefined,
  options?: TSerializableParam,
) {
  const options_ = options || { clean: CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL }
  if (Array.isArray(data)) {
    return data.map((item) => modelToSerializableObj(item, options_))
  }
  if ((data as any)?.constructor?.isModelBase) {
    return modelToSerializableObj(data as ModelBase, options_)
  }
  const data_ = data || {}
  return Object.keys(data_).reduce((acc, property) => {
    acc[property] = Array.isArray(data_[property])
      ? data_[property].map((item) => modelToSerializableObj(item, options_))
      : modelToSerializableObj(data_[property], options_)
    return acc
  }, {} as { [key: string]: any })
}
