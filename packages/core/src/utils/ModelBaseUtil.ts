/**
 * Created by shuai.meng on 2017/8/2.
 */
import { cloneDeep } from 'lodash'
import { __COLUMNS__, __MODEL__ } from '../constant'
import { IColumnInner } from '../decorator'
import { ModelBase } from '../model'
export interface IModelOptions {
  // new 实例的时候，全局模型生效 begin 主要是动态模型会用到
  enableDataState?: boolean // 是否启用数据状态
  keepModelName?: boolean // 是否采用dto数据中的模型的key
  columnsInValue?: boolean // 是否根据模型实例中的值来初始化模型的列
  // new 实例的时候，全局模型生效 end
  // new 实例的时候，仅针对当前模型生效 begin
  current?: {
    enableDataState?: boolean
    keepModelName?: boolean
    columnsInValue?: boolean
  }
  // new 实例的时候，仅针对当前模型生效 end
  noDefault?: boolean
  dtoNamingMethod?: string
  group?: string // 分组 新增、更新、删除的时候，是否指定分组
  excludeGroup?: string // 排除分组，新增、更新、删除的时候，是否指定排除分组
  __noInit?: boolean
}

export interface IModelUpdateOptions {
  group?: string
  excludeGroup?: string
  current?: {
    enableDataState?: boolean
    keepModelName?: boolean
    columnsInValue?: boolean
  }
}

export function deepCopy(aObject: any) {
  if (!aObject) {
    return aObject
  }

  let v
  const bObject = Array.isArray(aObject) ? [] : ({} as any)
  for (const k in aObject) {
    v = aObject[k]
    bObject[k] = Object.prototype.toString.call(v) === '[object Object]' ? deepCopy(v) : v
  }

  return bObject
}

function getColumnKey(field: IColumnInner) {
  if (ModelBase.columnNamingMethod === 'camelCase') {
    return field.camelCaseName
  }
  return field.column
}

export function getColumnByKey<T extends ModelBase>(
  model: T,
  key: string,
  columns: { [key: string]: IColumnInner },
  param: {
    camelCase?: boolean
  },
) {
  // const m = Reflect.getOwnMetadata(
  //   LOCA_DATA_MODEL_KEY,
  //   model.constructor,
  // ) || {}
  let column = columns[key].column
  if (typeof param.camelCase !== 'undefined') {
    if (param.camelCase) {
      column = columns[key].camelCaseName
    }
    // } else if (m.columnNamingMethod === 'camelCase' || ModelBase.columnNamingMethod === 'camelCase') {
  } else if (ModelBase.columnNamingMethod === 'camelCase') {
    column = columns[key].camelCaseName
  }
  return column
}

function getColumnDto<T extends ModelBase>(model: T, dto: any, field: IColumnInner) {
  const m = (model.constructor as any)[__MODEL__] || {}
  let retData
  if (m.dtoNamingMethod === 'mix' || ModelBase.dtoNamingMethod === 'mix') {
    if (Object.prototype.hasOwnProperty.call(dto, field.column) && typeof dto[field.column] !== 'undefined') {
      retData = dto[field.column]
    } else if (
      Object.prototype.hasOwnProperty.call(dto, field.camelCaseName) &&
      typeof dto[field.camelCaseName] !== 'undefined'
    ) {
      retData = dto[field.camelCaseName]
    }
  } else if (m.dtoNamingMethod === 'camelCase' || ModelBase.dtoNamingMethod === 'camelCase') {
    if (
      Object.prototype.hasOwnProperty.call(dto, field.camelCaseName) &&
      typeof dto[field.camelCaseName] !== 'undefined'
    ) {
      retData = dto[field.camelCaseName]
    }
  } else {
    retData = dto[field.column]
  }
  // 如果retData为undefined才考虑别名的数据
  if (typeof retData === 'undefined' && field.aliasName) {
    retData = dto[field.aliasName]
  }
  return retData
}
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
  return fn
}
/**
 * @description 创建对象
 * @param fn
 */
export function create<T extends ModelBase>(fn_: new (dto?: any, options?: IModelOptions) => T) {
  return function createDTO(dto?: any, options?: IModelOptions) {
    const fn = getModelType(fn_)
    const t_ = new fn(dto, options)
    if (options?.__noInit) {
      createModelByDTO<T>(t_, (t_ as any).getColumns(), dto, options)
    }
    return t_
  }
}

/**
 * @description 设置默认值
 *
 * @param model
 * @param field
 * @param key
 * @param modelDTO
 * @param options
 */
function setDefault<T extends ModelBase>(
  model: T,
  field: IColumnInner,
  key: keyof T,
  modelDTO: any,
  options?: IModelOptions,
) {
  if (typeof field.default === 'undefined' && typeof field.autowired === 'undefined') {
    model[key] = undefined as (typeof model)[keyof T]
  } else {
    // TODO: field.default === true 需要项目改进代码后在删除
    if (field.default === true || field.autowired === true) {
      if (field.type === Array) {
        model[key] = (() => {
          return []
        })() as (typeof model)[keyof T]
      } else if (field.type === Object) {
        model[key] = (() => {
          return {}
        })() as (typeof model)[keyof T]
      } else if (field.childType) {
        model[key] = create<T>(field.childType)(field.default, options) as (typeof model)[keyof T]
      } else {
        model[key] = field.default
      }
    } else {
      if (typeof field.default === 'function') {
        model[key] = field.default.apply(null, [
          {
            key: getColumnKey(field),
            data: modelDTO,
            field,
          },
        ])
      } else {
        model[key] = field.default
      }
    }
  }
}

/**
 * @description 创建子对象
 *
 * @param model
 * @param field
 * @param key
 * @param modelDTO
 */
export function createChildField<T extends ModelBase>(
  model: T,
  field: IColumnInner,
  key: keyof T,
  modelDTO: any,
  options?: IModelOptions,
) {
  const formatterValue = getFormatterValue(model, field, modelDTO)
  if (field.type === Array) {
    if (Array.isArray(formatterValue)) {
      const arr: any[] = (() => {
        return []
      })()
      formatterValue.forEach((itemDTO: any) => {
        arr.push(create<T>(field.childType)(itemDTO, options))
      })
      return arr
    }
  } else {
    return create<T>(field.childType)(formatterValue, options)
  }
}

/**
 * @description 获得格式化后的值
 *
 * @param model
 * @param field
 * @param modelDTO
 */
function getFormatterValue<T extends ModelBase>(model: T, field: IColumnInner, modelDTO: any) {
  const deserialize = field.deserialize || field.formatter
  if (typeof deserialize === 'function') {
    return deserialize.apply(model, [
      {
        value: getColumnDto(model, modelDTO, field),
        key: getColumnKey(field), // 为了兼容，暂时保留
        name: getColumnKey(field), // 旧的名字为key
        data: modelDTO,
        field,
      },
    ])
  } else {
    return getColumnDto(model, modelDTO, field)
  }
}

/**
 * @description 更新数组对象的值
 * @param field
 * @param model
 * @param columnName
 * @param data
 * @param options
 */
function updateArrField<T extends ModelBase>(
  field: IColumnInner,
  model: T,
  columnName: keyof T,
  data: any,
  options?: IModelOptions,
) {
  const arrDto = getColumnDto(model, data, field)
  if (typeof arrDto !== 'undefined') {
    if (arrDto.length) {
      arrDto.forEach((dto: any) => {
        let find = false
        if ((model as T)[columnName] && Array.isArray((model as T)[columnName])) {
          ;((model as T)[columnName] as any[]).forEach((item: any) => {
            if (item.getPrimaryValue().join(',') === item.getPrimaryValueFromData(dto).join(',')) {
              item.update(dto)
              find = true
            }
          })
          if (!find) {
            ;(model as any)[columnName].push(create<T>(field.childType)(dto, options))
          }
        } else {
          ;(model as any)[columnName] = []
          ;(model as any)[columnName].push(create<T>(field.childType)(dto, options))
        }
      })
    } else {
      ;(model as any)[columnName] = []
    }
  }
}

function updateForeign<T extends ModelBase>(
  field: IColumnInner,
  model: T,
  columnName: keyof T,
  data: any,
  columnDto: any,
  options?: IModelOptions,
) {
  // 带 foreign 属性的对象会强制校验主键一致
  if ((model[columnName] as ModelBase).getPrimaryValueFromData(columnDto.join(','))) {
    // 判断之前是否有值，如果没有值则创建
    if (model[columnName]) {
      // 判断之前的值是否和新的值相等，一致则更新
      if (
        (model[columnName] as any).getPrimaryValue().join(',') ===
        (model[columnName] as any).getPrimaryValueFromData(columnDto).join(',')
      ) {
        ;(model[columnName] as any).update(getColumnDto(model, data, field))
      }
    } else {
      ;(model[columnName] as any) = create<T>(field.childType)(columnDto, options)
    }
  }
}

/**
 * @description 初始化所有 column 对应的值
 *
 * @param flag
 * @param columnName
 * @param model
 * @param columns
 * @param data
 * @param options
 */
function initField<T extends ModelBase>(
  flag: string,
  columnName: keyof T,
  model: T,
  columns: any,
  data: any,
  options?: IModelOptions,
) {
  const field = columns[columnName]
  const columnDto = getColumnDto(model, data, field)
  if (flag === 'create') {
    if (typeof columnDto !== 'undefined') {
      if (field.childType) {
        ;(model as any)[columnName] = createChildField<T>(model, field, columnName, data, options)
      } else {
        if (field.type === Array) {
          ;(model as any)[columnName] = getFormatterValue<T>(model, field, cloneDeep(data))
        } else {
          ;(model as any)[columnName] = getFormatterValue<T>(model, field, data)
        }
      }
    } else {
      let noDefault = false
      if (options && typeof options.noDefault !== 'undefined') {
        noDefault = options.noDefault
      }
      if (!noDefault) {
        setDefault<T>(model, field, columnName, data, options)
      }
    }
  } else if (flag === 'update') {
    if (typeof columnDto !== 'undefined') {
      if (field.childType) {
        if (field.type === Array) {
          updateArrField<T>(field, model, columnName, data, options)
        } else if (field.foreign) {
          updateForeign<T>(field, model, columnName, data, columnDto, options)
        } else {
          if (typeof (model as any)[columnName] !== 'undefined' && (model as any)[columnName].update) {
            ;(model as any)[columnName].update(columnDto)
          } else {
            ;(model as any)[columnName] = create(field.childType)(columnDto, options)
          }
        }
      } else {
        ;(model as any)[columnName] = getFormatterValue(model, field, data)
      }
    }
  }
}

function setModelByDTO<T extends ModelBase>(
  flag: string,
  model: T,
  props: any,
  modelDTO: any,
  options?: IModelOptions,
) {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      // 如果没有分组，或者符合当前分组的时候，需要赋值。
      if (
        (typeof options?.group !== 'undefined' &&
          props[key].group &&
          props[key].group?.indexOf(options?.group as string) !== -1) ||
        !options?.group
      ) {
        initField<T>(flag, key as keyof T, model, props, modelDTO, options)
      } else if (
        (typeof options?.excludeGroup !== 'undefined' &&
          props[key].group &&
          props[key].group?.indexOf(options?.excludeGroup as string) === -1) ||
        !options?.group
      ) {
        initField<T>(flag, key as keyof T, model, props, modelDTO, options)
      }
    }
  }
}

//
// function watchData(flag: string, model: ModelBase, props: any, modelDTO: any, options?: IModelOptions) {
//   for (const key in props) {
//     const field = props[key]
//     if (field.childType) {
//       Object.defineProperty(model, key, {
//         get() {
//           if (Reflect.hasOwnMetadata(key + '__', model)) {
//             const temp = Reflect.getOwnMetadata(key + '__', model)
//             ;(model as any)[key] = temp
//             // 需要批量处理，先放入缓存里面。
//             // setTimeout(() => { Reflect.deleteMetadata([key + '__'], model)})
//             return temp
//           }
//         },
//         set(newValue) {
//           console.log('new Value', newValue)
//           if (newValue && !Array.isArray(newValue) && typeof newValue?.isChange !== 'function') {
//             Reflect.defineMetadata(
//               key + '__',
//               createChildField(model, field, key, {
//                 [key]: newValue,
//               }, options),
//               model,
//             )
//             // (model as any)[key + '__'] = createChildField(model, field, key, {
//             //   [key]: newValue,
//             // }, options)
//           } else {
//             ;(model as any)[key] = newValue
//           }
//         },
//       })
//     }
//   }
// }

// export split =========================

export function initModel_<T extends ModelBase>(t_: T, options?: IModelOptions) {
  /**
   * TODO:
   * 针对 __model__ 上面的属性定义分为两种。t_.constructor 和 t_
   * 因为存在动态模型，所以针对 __model__ 的归属只能通过 current 这个参数来区分。
   */
  if (typeof options?.columnsInValue !== 'undefined') {
    const m = (t_.constructor as any)[__MODEL__] || {}
    m.columnsInValue = options?.columnsInValue
    ;(t_.constructor as any)[__MODEL__] = m
  }
  if (typeof options?.keepModelName !== 'undefined') {
    const m = (t_.constructor as any)[__MODEL__] || {}
    m.keepModelName = options?.keepModelName
    ;(t_.constructor as any)[__MODEL__] = m
  }
  if (typeof options?.current?.enableDataState === 'undefined' && typeof options?.enableDataState !== 'undefined') {
    const m = (t_.constructor as any)[__MODEL__] || {}
    m.enableDataState = options?.enableDataState
    ;(t_.constructor as any)[__MODEL__] = m
  }
  if (!(t_.constructor as any)[__COLUMNS__]) {
    ;(t_.constructor as any)[__COLUMNS__] = {}
  }
}

export function createModelByDTO<T extends ModelBase>(model: T, props: any, dto: any, options?: IModelOptions) {
  // 初始化的时候可以是空
  const modelDTO: { [index: string]: any } = dto || {}
  setModelByDTO('create', model, props, modelDTO, options)
  model.saveChangedData({
    group: options?.group,
    enableDataState: options?.current?.enableDataState,
  })
  // watchData('create', model, props, modelDTO, options)
}

export function extendModelByDTO<T extends ModelBase>(model: T, props: any, dto: any, options?: IModelOptions) {
  // 初始化的时候可以是空
  const modelDTO: { [index: string]: any } = dto || {}
  setModelByDTO('create', model, props, modelDTO, options)
}

export function updateModelByDTO<T extends ModelBase>(model: T, props: any, dto: any, options?: IModelUpdateOptions) {
  // 更新的时候可以是空
  const modelDTO = dto || {}
  setModelByDTO('update', model, props, modelDTO, options)
  model.saveChangedData({
    group: options?.group,
    enableDataState: options?.current?.enableDataState,
  })
}
