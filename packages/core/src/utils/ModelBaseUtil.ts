/**
 * Created by shuai.meng on 2017/8/2.
 */
import { ModelBase } from '../model'
import { CLONE_KEY, IColumnInner, LOCA_DATA_MODEL_KEY } from '../decorator'

export interface IModelOptions {
  noDefault?: boolean
  enableDataState?: boolean
  keepModelName?: boolean
  columnsInValue?: boolean
  dtoNamingMethod?: string
  group?: string
  excludeGroup?: string
  current?: {
    enableDataState?: boolean
    keepModelName?: boolean
    columnsInValue?: boolean
  }
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
    bObject[k] =
      Object.prototype.toString.call(v) === '[object Object]' ? deepCopy(v) : v
  }

  return bObject
}

function getColumnKey(field: IColumnInner) {
  if (ModelBase.columnNamingMethod === 'camelCase') {
    return field.camelCaseName
  }
  return field.column
}

export function getColumnByKey(
  model: any,
  key: string,
  columns: { [key: string]: IColumnInner },
  param: {
    camelCase?: boolean
  }
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

function getColumnDto(model: any, dto: any, field: IColumnInner) {
  const m = Reflect.getOwnMetadata(LOCA_DATA_MODEL_KEY, model.constructor) || {}
  let retData
  if (m.dtoNamingMethod === 'mix' || ModelBase.dtoNamingMethod === 'mix') {
    if (
      dto.hasOwnProperty(field.column) &&
      typeof dto[field.column] !== 'undefined'
    ) {
      retData = dto[field.column]
    } else if (
      dto.hasOwnProperty(field.camelCaseName) &&
      typeof dto[field.camelCaseName] !== 'undefined'
    ) {
      retData = dto[field.camelCaseName]
    }
  } else if (
    m.dtoNamingMethod === 'camelCase' ||
    ModelBase.dtoNamingMethod === 'camelCase'
  ) {
    if (
      dto.hasOwnProperty(field.camelCaseName) &&
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

/**
 * @description 创建对象
 * @param fn
 */
function create(fn: any) {
  return function createDTO(dto: any, options?: IModelOptions) {
    return new fn(dto, options)
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
function setDefault(
  model: any,
  field: IColumnInner,
  key: string,
  modelDTO: any,
  options?: IModelOptions
) {
  if (
    typeof field.default === 'undefined' &&
    typeof field.autowired === 'undefined'
  ) {
    model[key] = undefined
  } else {
    // TODO: field.default === true 需要项目改进代码后在删除
    if (field.default === true || field.autowired === true) {
      if (field.type === Array) {
        model[key] = (() => {
          return []
        })()
      } else if (field.type === Object) {
        model[key] = (() => {
          return {}
        })()
      } else if (field.childType) {
        model[key] = create(field.childType)(field.default, options)
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
export function createChildField(
  model: any,
  field: IColumnInner,
  key: string,
  modelDTO: any,
  options?: IModelOptions
) {
  const formatterValue = getFormatterValue(model, field, modelDTO)
  if (field.type === Array) {
    if (Array.isArray(formatterValue)) {
      const arr: any[] = (() => {
        return []
      })()
      formatterValue.forEach((itemDTO: any) => {
        arr.push(create(field.childType)(itemDTO, options))
      })
      return arr
    }
  } else {
    return create(field.childType)(formatterValue, options)
  }
}

/**
 * @description 获得格式化后的值
 *
 * @param model
 * @param field
 * @param modelDTO
 */
function getFormatterValue(model: any, field: IColumnInner, modelDTO: any) {
  if (typeof field.formatter === 'function') {
    return field.formatter.apply(model, [
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
function updateArrField(
  field: IColumnInner,
  model: ModelBase,
  columnName: string,
  data: any,
  options?: IModelOptions
) {
  const arrDto = getColumnDto(model, data, field)
  if (typeof arrDto !== 'undefined') {
    if (arrDto.length) {
      arrDto.forEach((dto: any) => {
        let find = false
        if ((model as any)[columnName]) {
          ;(model as any)[columnName].forEach((item: any) => {
            if (
              item.getPrimaryValue().join(',') ===
              item.getPrimaryValueFromData(dto).join(',')
            ) {
              item.update(dto)
              find = true
            }
          })
          if (!find) {
            ;(model as any)[columnName].push(
              create(field.childType)(dto, options)
            )
          }
        } else {
          ;(model as any)[columnName] = []
          ;(model as any)[columnName].push(
            create(field.childType)(dto, options)
          )
        }
      })
    } else {
      ;(model as any)[columnName] = []
    }
  }
}

function updateForeign(
  field: IColumnInner,
  model: any,
  columnName: string,
  data: any,
  columnDto: any,
  options?: IModelOptions
) {
  // 带 foreign 属性的对象会强制校验主键一致
  if (model[columnName].getPrimaryValueFromData(columnDto.join(','))) {
    // 判断之前是否有值，如果没有值则创建
    if (model[columnName]) {
      // 判断之前的值是否和新的值相等，一致则更新
      if (
        model[columnName].getPrimaryValue().join(',') ===
        model[columnName].getPrimaryValueFromData(columnDto).join(',')
      ) {
        model[columnName].update(getColumnDto(model, data, field))
      }
    } else {
      model[columnName] = create(field.childType)(columnDto, options)
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
function initField(
  flag: string,
  columnName: string,
  model: ModelBase,
  columns: any,
  data: any,
  options?: IModelOptions
) {
  const field = columns[columnName]
  const columnDto = getColumnDto(model, data, field)
  if (flag === 'create') {
    if (typeof columnDto !== 'undefined') {
      if (field.childType) {
        ;(model as any)[columnName] = createChildField(
          model,
          field,
          columnName,
          data,
          options
        )
      } else {
        if (field.type === Array) {
          ;(model as any)[columnName] = getFormatterValue(
            model,
            field,
            deepCopy(data)
          )
        } else {
          ;(model as any)[columnName] = getFormatterValue(model, field, data)
        }
      }
    } else {
      let noDefault = false
      if (options && typeof options.noDefault !== 'undefined') {
        noDefault = options.noDefault
      }
      if (!noDefault) {
        setDefault(model, field, columnName, data, options)
      }
    }
  } else if (flag === 'update') {
    if (typeof columnDto !== 'undefined') {
      if (field.childType) {
        if (field.type === Array) {
          updateArrField(field, model, columnName, data, options)
        } else if (field.foreign) {
          updateForeign(field, model, columnName, data, columnDto, options)
        } else {
          if (
            typeof (model as any)[columnName] !== 'undefined' &&
            (model as any)[columnName].update
          ) {
            ;(model as any)[columnName].update(columnDto)
          } else {
            ;(model as any)[columnName] = create(field.childType)(
              columnDto,
              options
            )
          }
        }
      } else {
        ;(model as any)[columnName] = getFormatterValue(model, field, data)
      }
    }
  }
}

function setModelByDTO(
  flag: string,
  model: ModelBase,
  props: any,
  modelDTO: any,
  options?: IModelOptions
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
        initField(flag, key, model, props, modelDTO, options)
      } else if (
        (typeof options?.excludeGroup !== 'undefined' &&
          props[key].group &&
          props[key].group?.indexOf(options?.excludeGroup as string) === -1) ||
        !options?.group
      ) {
        initField(flag, key, model, props, modelDTO, options)
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

export function createModelByDTO(
  model: ModelBase,
  props: any,
  dto: any,
  options?: IModelOptions
) {
  // 初始化的时候可以是空
  const modelDTO: { [index: string]: any } = dto || {}
  setModelByDTO('create', model, props, modelDTO, options)
  model.saveChangedData({
    group: options?.group,
    enableDataState: options?.current?.enableDataState,
  })
  // watchData('create', model, props, modelDTO, options)
}

export function extendModelByDTO(
  model: ModelBase,
  props: any,
  dto: any,
  options?: IModelOptions
) {
  // 初始化的时候可以是空
  const modelDTO: { [index: string]: any } = dto || {}
  setModelByDTO('create', model, props, modelDTO, options)
}

export function updateModelByDTO(
  model: ModelBase,
  props: any,
  dto: any,
  options?: IModelUpdateOptions
) {
  // 更新的时候可以是空
  const modelDTO = dto || {}
  setModelByDTO('update', model, props, modelDTO, options)
  model.saveChangedData({
    group: options?.group,
    enableDataState: options?.current?.enableDataState,
  })
}
