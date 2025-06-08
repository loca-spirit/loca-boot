import type { IModelOptions } from '../decorator/types'
import type { ModelBase } from '../model/ModelBase'

export function getModelType(fn_: any) {
  let fn: any = fn_

  // 仅支持两种类型，函数和类，类也仅支持继承自 ModelBase 的类
  if (fn_ && !(fn_ as any).isModelBase) {
    try {
      fn = (fn_ as any).call(null)
    } catch (e) {
      fn = fn_
      console.error(e)
    }
  }
  return fn as typeof ModelBase
}

/**
 * @description 创建对象
 * @param fn
 */
export function create<T extends ModelBase>(fn_: new (dto?: any, options?: IModelOptions) => T) {
  return function createDTO(dto?: any, options?: IModelOptions) {
    const fn = getModelType(fn_)
    const t_ = fn.create(dto, options)
    return t_ as T
  }
}
