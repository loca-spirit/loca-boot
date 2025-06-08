/**
 * Created by shuai.meng on 2017/8/2.
 */
import { cloneDeep } from 'lodash'
import type {
  IColumnDefault,
  IColumnDeserialize,
  IColumnInner,
  IModelOptions,
  IModelUpdateOptions,
} from '../decorator/types'
import { ModelBase } from '../model/ModelBase'
import { deserializeRecord, deserializeRecordArray } from '../tools/methods'
import { create } from './create'
import { getColumnSerializeName } from './getCollumnSerializeName'
import { getModelProps } from './ModelBaseProps'

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

function getDeserializeDtoValue<T extends ModelBase>(
  model: T,
  dto: any,
  field: IColumnInner<T>,
  options?: IModelOptions,
) {
  const dns = getModelProps(model, 'deserializeNamingStrategies', options?.current)
  let retData: any
  if (dns === 'mix') {
    if (Object.prototype.hasOwnProperty.call(dto, field.name) && typeof dto[field.name] !== 'undefined') {
      retData = dto[field.name]
    } else if (
      Object.prototype.hasOwnProperty.call(dto, field.camelCaseName) &&
      typeof dto[field.camelCaseName] !== 'undefined'
    ) {
      retData = dto[field.camelCaseName]
    }
  } else if (dns === 'camelCase') {
    if (
      Object.prototype.hasOwnProperty.call(dto, field.camelCaseName) &&
      typeof dto[field.camelCaseName] !== 'undefined'
    ) {
      retData = dto[field.camelCaseName]
    }
  } else {
    retData = dto[field.name]
  }
  // 如果retData为undefined才考虑别名的数据
  if (typeof retData === 'undefined' && field.aliasName && field.camelCaseAliasName) {
    if (dns === 'mix') {
      if (Object.prototype.hasOwnProperty.call(dto, field.aliasName) && typeof dto[field.aliasName] !== 'undefined') {
        retData = dto[field.aliasName]
      } else if (
        Object.prototype.hasOwnProperty.call(dto, field.camelCaseAliasName) &&
        typeof dto[field.camelCaseAliasName] !== 'undefined'
      ) {
        retData = dto[field.camelCaseAliasName]
      }
    } else if (dns === 'camelCase') {
      if (
        Object.prototype.hasOwnProperty.call(dto, field.camelCaseAliasName) &&
        typeof dto[field.camelCaseAliasName] !== 'undefined'
      ) {
        retData = dto[field.camelCaseAliasName]
      }
    } else {
      retData = dto[field.aliasName]
    }
  }
  return retData
}

function genColumnDefault<T extends ModelBase>(
  model: T,
  column: IColumnInner<T>,
  modelDTO: any,
  key: string,
  options?: IModelOptions,
) {
  const sns = getModelProps(model, 'serializeNamingStrategies', options?.current)
  if (typeof column.default === 'function') {
    const paramsDefault: IColumnDefault<T> = {
      name: getColumnSerializeName(column, sns),
      property: key,
      data: modelDTO,
      column,
    }
    return column.default.apply(null, [paramsDefault])
  } else {
    return column.default
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
  column: IColumnInner<T>,
  key: keyof T,
  modelDTO: any,
  options?: IModelOptions,
) {
  const sns = getModelProps(model, 'serializeNamingStrategies', options?.current)
  if (typeof column.default === 'undefined' && typeof column.autowired === 'undefined') {
    model[key] = undefined as (typeof model)[keyof T]
  } else {
    // TODO: field.default === true 需要项目改进代码后在删除
    if (column.default === true || column.autowired === true) {
      if (column.type === Array) {
        model[key] = (() => {
          return []
        })() as (typeof model)[keyof T]
      } else if (column.type === Object) {
        model[key] = (() => {
          return {}
        })() as (typeof model)[keyof T]
      } else if (column.childType) {
        model[key] = create<T>(column.childType)({}, options) as (typeof model)[keyof T]
      } else {
        model[key] = genColumnDefault(model, column, modelDTO, key as string, options)
      }
    } else {
      model[key] = genColumnDefault(model, column, modelDTO, key as string, options)
    }
  }
}

/**
 * @description 获得格式化后的值
 *
 * @param model
 * @param column
 * @param modelDTO
 * @param options
 */
function getDeserializeValue<T extends ModelBase>(
  model: T,
  column: IColumnInner<T>,
  modelDTO: any,
  options?: IModelOptions,
) {
  const sns = getModelProps(model, 'deserializeNamingStrategies', options?.current)
  const deserialize = column.deserialize || column.formatter
  if (typeof deserialize === 'function') {
    const paramsDeserialize: IColumnDeserialize<T> = {
      value: getDeserializeDtoValue(model, modelDTO, column, options),
      name: getColumnSerializeName(column, sns), // 旧的名字为key
      property: column.property,
      serializeData: modelDTO,
      column,
    }
    return deserialize.apply(model, [paramsDeserialize])
  } else {
    return getDeserializeDtoValue(model, modelDTO, column)
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
  field: IColumnInner<T>,
  key: keyof T,
  modelDTO: any,
  options?: IModelOptions,
) {
  const deserializeValue = getDeserializeValue(model, field, modelDTO, options)
  if (Array.isArray(deserializeValue)) {
    const arr: any[] = (() => {
      return []
    })()
    deserializeValue.forEach((itemDTO: any) => {
      arr.push(create<T>(field.childType)(itemDTO, options))
    })
    return arr
  } else {
    if (field.type === 'record') {
      return deserializeRecord(field.childType, deserializeValue, options)
    } else if (field.type === 'recordArray') {
      return deserializeRecordArray(field.childType, deserializeValue, options)
    }
    return create<T>(field.childType)(deserializeValue, options)
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
  field: IColumnInner<T>,
  model: T,
  columnName: keyof T,
  data: any,
  options?: IModelOptions,
) {
  const arrDto = getDeserializeDtoValue(model, data, field)
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
  field: IColumnInner<T>,
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
        ;(model[columnName] as any).update(getDeserializeDtoValue(model, data, field))
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
  columns: { [key: string]: IColumnInner<T> },
  data: any,
  options?: IModelOptions,
) {
  const field = columns[columnName as string]
  const columnDto = getDeserializeDtoValue(model, data, field)
  if (flag === 'create') {
    if (typeof columnDto !== 'undefined') {
      if (field.childType) {
        ;(model as any)[columnName] = createChildField<T>(model, field, columnName, data, options)
      } else {
        if (Array.isArray(getDeserializeDtoValue(model, data, field))) {
          ;(model as any)[columnName] = getDeserializeValue<T>(model, field, cloneDeep(data))
        } else {
          ;(model as any)[columnName] = getDeserializeValue<T>(model, field, data)
        }
      }
    } else {
      if (!getModelProps(model, 'noDefault', options?.current)) {
        setDefault<T>(model, field, columnName, data, options)
      }
    }
  } else if (flag === 'update') {
    if (typeof columnDto !== 'undefined') {
      if (field.childType) {
        if (Array.isArray(getDeserializeDtoValue(model, data, field))) {
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
        ;(model as any)[columnName] = getDeserializeValue(model, field, data)
      }
    }
  }
}

function setModelByDTO<T extends ModelBase>(
  flag: string,
  model: T,
  props: { [key: string]: IColumnInner<T> },
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

export function createModelByDTO<T extends ModelBase>(model: T, props: any, dto: any, options?: IModelOptions) {
  // 初始化的时候可以是空
  const modelDTO: { [index: string]: any } = dto || {}
  setModelByDTO('create', model, props, modelDTO, options)
  model.saveChangedData({
    group: options?.group,
    enableDataState: getModelProps(model, 'enableDataState', options?.current),
  })
}

export function extendModelByDTO<T extends ModelBase>(model: T, props: any, dto: any, options?: IModelOptions) {
  // 初始化的时候可以是空
  const modelDTO: { [index: string]: any } = dto || {}
  setModelByDTO('create', model, props, modelDTO, options)
}

export function updateModelByDTO<T extends ModelBase>(model: T, props: any, dto: any, options?: IModelUpdateOptions) {
  // 更新的时候可以是空
  const modelDTO: { [index: string]: any } = dto || {}
  setModelByDTO('update', model, props, modelDTO, options)
  model.saveChangedData({
    group: options?.group,
    enableDataState: getModelProps(model, 'enableDataState', options?.current),
  })
}
