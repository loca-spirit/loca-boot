import merge from 'deepmerge'
import { ModelTool, toRaw } from '../utils/lib'
import {
  CLONE_KEY,
  LOCA_COLUMN_KEY,
  LOCA_DATA_MODEL_KEY,
  MODEL_COLUMN_KEY,
  IColumnInner,
  IDataModel,
  generateColumnsFromData,
} from '../decorator'
import { getChange } from '../utils/ChangedModelUtil'
import {
  createModelByDTO,
  deepCopy,
  updateModelByDTO,
  extendModelByDTO,
  IModelOptions,
  createChildField,
  getColumnByKey,
} from '../utils/ModelBaseUtil'
import { getTag } from 'loca-boot-common'
import { generateUUID } from '../utils/uuid'
import { setEmpty } from '../utils/setEmpty'

export const ModelColumns = {} as { [key: string]: any[] }
// 用WeakMap的原因，是因为有很多动态模型创建好后会被释放掉。而普通的map对象会让 modelColumnsMap 越来越大。
export const modelColumnsMap = new WeakMap()

export interface IDataByOriginalOption extends IModelOptions {
  keepBackUp?: boolean;
}

/**
 *
 * 如果 removeUndefinedAndNullValue 设置为 true，则 undefined 和 null 的值是获取不到的，
 * 如果你设置了某个属性值为，''，这个属性是可以的值是可以获取到为 '' 的，如果你不想要这个属性的值，
 * 请设置这个属性为 undefined，或者删除掉这个属性的 key
 *
 * emptyValue: 当序列化后的值是 undefined 或者 null 的时候，可以手动指定返回值为 emptyValue 所代表的值。
 * @param this_
 * @param param
 * @return {{}}
 */
function modelToSerializableObj(
  this_: any,
  param: {
    clean: CLEAN_ENUM
    group?: string
    excludeGroup?: string
    emptyValue?: any
    emptyValueScope?: any[]
    trim?: boolean
    camelCase?: boolean
  }) {
  const dto: { [index: string]: any } = {}
  const columns = (this_ as any).getColumns?.() as { [key: string]: IColumnInner } || {}
  const target = this_ as any
  for (const key in columns) {
    if (columns.hasOwnProperty(key)) {
      const columnName = getColumnByKey(this_, key, columns, param)
      const isEmptyValueSet = setEmpty(target[key], param.emptyValueScope, param.emptyValue, columns[key].type)
      if (isEmptyValueSet) {
        dto[columnName] = param.emptyValue
      } else {
        if (columns[key].childType) {
          // 如果原始数据中没有这个字段，则不存入saveData
          if (target[key]) {
            if (columns[key].type === Array) {
              dto[columnName] = []
              target[key].forEach((m: any) => {
                dto[columnName].push(modelToSerializableObj(m, param))
              })
              if (param.clean === CLEAN_ENUM.CLEAN_DIRTY) {
                if (dto[columnName] && dto[columnName].length === 0) {
                  delete dto[columnName]
                }
              }
            } else {
              dto[columnName] = modelToSerializableObj(target[key], param)
              if (param.clean === CLEAN_ENUM.CLEAN_DIRTY) {
                if (dto[columnName] && Object.keys(dto[columnName]).length === 0) {
                  delete dto[columnName]
                }
              }
            }
          }
        } else {
          let value = target[key]
          // 处理any类型的数据，解除对普通对象的数据的引用。
          if (typeof value !== 'undefined' && value !== null && (getTag(value) == '[object Object]' || Array.isArray(value))) {
            value = JSON.parse(JSON.stringify(value))
          }
          if (typeof columns[key].unformatter === 'function') {
            value = columns[key].unformatter.apply(target, [{
              value: target[key],
              key,
              data: this_,
              columns,
            }])
          }
          if (param.clean === CLEAN_ENUM.CLEAN_DIRTY) {
            cleanDirty(this_, key, dto, columnName, value, param)
          } else if (param.clean === CLEAN_ENUM.CLEAN_UNDEFINED) {
            // 默认null或者undefined的字段会包含在返回的对象中，如果需要返回对象不返回null和undefined的值，调用方法时传true
            if (typeof target[key] !== 'undefined') {
              dto[columnName] = value
            }
          } else if (param.clean === CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL) {
            // 默认null或者undefined的字段会包含在返回的对象中，如果需要返回对象不返回null和undefined的值，调用方法时传true
            if (typeof target[key] !== 'undefined' && target[key] !== null) {
              dto[columnName] = value
            }
          } else {
            dto[columnName] = value
          }
          if (columns[key].trim && param.trim && typeof dto[columnName] === 'string') {
            dto[columnName] = (dto[columnName] as string).trim()
          }
        }
      }

      // 处理分组的逻辑 begin
      if (typeof param.group !== 'undefined') {
        // console.log('param.group', columns[key].group, param.group)
        // 如果有分组，必须返回分组中的数据。
        // 此处的逻辑是把非当前分组的数据剔除掉。
        if (columns[key].group) {
          // console.log('group', columns[key].group)
          // console.log('param.group', param.group)
        }
        if (columns[key].group?.indexOf(param.group as string) === -1) {
          // console.log('delete', columns[key].group, param.group)
          delete dto[columnName]
        }
      } else if (typeof param.excludeGroup !== 'undefined') {
        if (columns[key].group && (columns[key].group?.indexOf(param.excludeGroup as string) !== -1)) {
          // console.log('delete', columns[key].group, param.group)
          delete dto[columnName]
        }
      }
      // 处理分组的逻辑 end
    }
  }
  return dto
}

function callMethod(
  this_: any,
  param: {
    method: string
    camelCase?: boolean
  }) {
  const columns = this_.getColumns() as { [key: string]: IColumnInner }
  const target = this_ as any
  const dataModel: IDataModel = Reflect.getOwnMetadata(
    LOCA_DATA_MODEL_KEY,
    target.constructor,
  ) || {}
  dataModel.methods = dataModel.methods || {}
  for (const key in columns) {
    if (columns.hasOwnProperty(key)) {
      if (columns[key].childType) {
        if (columns[key].type === Array) {
          target[key].forEach((m: any) => {
            callMethod(m, param)
          })
        } else {
          callMethod(target[key], param)
        }
      }
    }
  }

  if ((this_ as any)[param.method]) {
    (this_ as any)[param.method]({ data: this_ })
  }
  if ((dataModel as any).methods[param.method] && typeof (dataModel as any).methods[param.method] === 'string') {
    try {
      const str = (dataModel as any).methods[param.method]
      const reg = /^\{\{(.*)\}\}$/
      const res = str.match(reg)
      if (res.length > 1) {
        return new Function('$model', 'with($model) { return ('.concat(res[1], '); }'))(this_)
      }
    } catch (err) {
      // console.log(err)
    }
  }
  if ((dataModel as any).methods[param.method]) {
    (dataModel as any).methods[param.method]({ data: this_ })
  }
}

function cleanDirty(
  this_: any, key: string, dto: { [index: string]: any }, columnName: string, value: any, params: {
    clean: CLEAN_ENUM
    emptyValue?: any
    camelCase?: boolean
  }) {
  const target = this_ as any
  // 默认null或者undefined的字段会包含在返回的对象中，如果需要返回对象不返回null、空和undefined的值，调用方法时传 'cleanDirty'
  if (typeof target[key] === 'string') {
    if (target[key].replace(/\s/g, '') !== '') {
      dto[columnName] = value
    }
  } else if (ModelTool.isPlainObject(target[key])) {
    if (Object.keys(target[key]).length !== 0) {
      dto[columnName] = value
    }
  } else if (Array.isArray(target[key])) {
    if (target[key].length !== 0) {
      dto[columnName] = value
    }
  } else {
    if (typeof target[key] !== 'undefined' && target[key] !== null) {
      dto[columnName] = value
    } else {
      if (typeof params.emptyValue !== 'undefined') {
        dto[columnName] = params.emptyValue
      }
    }
  }
}

function setColumnToTarget(columns: { [key: string]: IColumnInner }, target: ModelBase, curProto: any) {
  // let modelColumn
  // if (Reflect.hasOwnMetadata(MODEL_COLUMN_KEY, target)) {
  //   modelColumn = Reflect.getOwnMetadata(MODEL_COLUMN_KEY, target) || {}
  // } else {
  //   const uuid = generateUUID()
  //   modelColumn = {
  //     uuid: uuid,
  //     columnArr: [uuid],
  //   }
  //   Reflect.defineMetadata(
  //     MODEL_COLUMN_KEY,
  //     modelColumn,
  //     target,
  //   )
  // }
  if (Reflect.hasOwnMetadata(LOCA_COLUMN_KEY, target)) {
    const c = Reflect.getOwnMetadata(LOCA_COLUMN_KEY, target) || {}
    columns = merge(columns, c, { clone: true })
    // ModelColumns[modelColumn.uuid] = modelColumn
  }
  return columns
}

function getColumnsUtil(columns: { [key: string]: IColumnInner }, target: ModelBase): { [key: string]: IColumnInner } {
  const curProto = Object.getPrototypeOf(target)
  if (Object.getPrototypeOf(curProto)?.getColumns) {
    columns = merge(columns, getColumnsUtil(columns, curProto) || {}, {
      clone: true,
    })
    return setColumnToTarget(columns, target, curProto)
  }
  return setColumnToTarget(columns, target, curProto)
}

export enum CLEAN_ENUM {
  // undefined
  CLEAN_UNDEFINED = 'cleanUndefined',
  // undefined or null
  CLEAN_UNDEFINED_AND_NULL = 'cleanUndefinedAndNull',
  // undefined or null or '' or []
  CLEAN_DIRTY = 'cleanDirty',
}

export class ModelBase {
  // 做标记用，判断当前class是不是继承ModelBase
  public static isModelBase = true
  public static columnNamingMethod: string
  public static dtoNamingMethod: string = 'mix'

  constructor(dto?: any, options?: IModelOptions) {
    const t_ = toRaw(this)

    /**
     * TODO:
     * 针对 LOCA_DATA_MODEL_KEY 上面的属性定义分为两种。t_.constructor 和 t_
     * 因为存在动态模型，所以针对 LOCA_DATA_MODEL_KEY 的归属只能通过 current 这个参数来区分。
     */
    if (typeof options?.columnsInValue !== 'undefined') {
      const m = Reflect.getOwnMetadata(
        LOCA_DATA_MODEL_KEY,
        t_.constructor,
      ) || {}
      m.columnsInValue = options?.columnsInValue
      Reflect.defineMetadata(
        LOCA_DATA_MODEL_KEY,
        m,
        t_.constructor,
      )
    }
    if (typeof options?.keepModelName !== 'undefined') {
      const m = Reflect.getOwnMetadata(
        LOCA_DATA_MODEL_KEY,
        t_.constructor,
      ) || {}
      m.keepModelName = options?.keepModelName
      Reflect.defineMetadata(
        LOCA_DATA_MODEL_KEY,
        m,
        t_.constructor,
      )
    }
    if (typeof options?.current?.enableDataState === 'undefined' &&
      typeof options?.enableDataState !== 'undefined'
    ) {
      const m = Reflect.getOwnMetadata(
        LOCA_DATA_MODEL_KEY,
        t_.constructor,
      ) || {}
      m.enableDataState = options?.enableDataState
      Reflect.defineMetadata(
        LOCA_DATA_MODEL_KEY,
        m,
        t_.constructor,
      )
    }
    if (!Reflect.getOwnMetadata(
      LOCA_COLUMN_KEY,
      t_,
    )) {
      Reflect.defineMetadata(
        LOCA_COLUMN_KEY,
        {},
        t_,
      )
    }
    let columns_ = modelColumnsMap.get(t_.constructor)
    if (!columns_) {
      columns_ = (t_ as any).getColumns({ dto })
      modelColumnsMap.set(t_.constructor, columns_)
    }
    createModelByDTO(t_, columns_, dto, options)
  }

  /**
   * @description 还原数据到上一个保存点之前，初始化保存点为创建对象的时候。
   */
  public static revertChangedData(target: ModelBase | ModelBase[] | { [key: string]: ModelBase }) {
    if (target instanceof Array) {
      target.forEach((item) => {
        ModelBase.revertChangedDataObject(item)
      })
    } else if (target instanceof ModelBase) {
      ModelBase.revertChangedDataObject(target)
    } else {
      Object.keys(target).forEach((key) => {
        ModelBase.revertChangedDataObject(target[key])
      })
    }
    return this
  }

  public static resetDefault(target: ModelBase | ModelBase[] | { [key: string]: ModelBase }) {
    target = toRaw(target)
    if (target instanceof Array) {
      target.forEach((item) => {
        ModelBase.resetDefaultObject(item)
      })
    } else if (target instanceof ModelBase) {
      ModelBase.resetDefaultObject(target)
    } else {
      Object.keys(target).forEach((key) => {
        ModelBase.resetDefaultObject((target as any)[key])
      })
    }
    return this
  }

  public static resetDefaultObject(target: ModelBase, options?: IModelOptions) {
    target = toRaw(target)
    if (!Reflect.getOwnMetadata(
      LOCA_COLUMN_KEY,
      this,
    )) {
      Reflect.defineMetadata(
        LOCA_COLUMN_KEY,
        {},
        this,
      )
    }
    createModelByDTO(target, (target as any).getColumns(), {}, options)
    return this
  }

  public static revertChangedDataObject(target: ModelBase) {
    const orgTarget = target as any
    target = toRaw(target)
    const C = Object.getPrototypeOf(target).constructor as any
    const org = new C(target.getOriginalData())
    const columns = (target as any).getColumns()
    // const t = target as any
    for (const key in columns) {
      orgTarget[key] = org[key]
      // t[key] = org[key] 此处不需要更新代理对象原始对象的值，因为代理对象会帮你做这个事情。
      // 也不要手动处理原始对象的值，否则代理对象不会更新。
    }
    return this
  }

  public static callMethod(data: ModelBase | ModelBase[], params: {
    method: string
    camelCase?: boolean
  }) {
    data = toRaw(data)
    if (Array.isArray(data)) {
      data.forEach((d) => {
        d.callMethod(params)
      })
    } else {
      data.callMethod(params)
    }
  }

  public callMethod(params: {
    method: string
    camelCase?: boolean
  }) {
    callMethod(toRaw(this), params)
  }

  public update(dto: any) {
    const t_ = toRaw(this)
    updateModelByDTO(t_, (t_ as any).getColumns({ dto }), dto)
    return this
  }

  public setDataByOriginal(dto: any, options?: IDataByOriginalOption) {
    const t_ = toRaw(this)
    if (options?.keepBackUp) {
      extendModelByDTO(t_, (t_ as any).getColumns({ dto }), dto)
    } else {
      createModelByDTO(t_, (t_ as any).getColumns({ dto }), dto)
    }
    return this
  }

  /**
   * @description 整个对象是否相等，需要子类自己实现。
   * ignoreEmptyString undefined 与 '' 比较视为相等
   */
  public equal() {
    return true
  }

  /**
   * @description 待完善
   * @description 判断所有 column 对应的值是相等的。
   * ignoreEmptyString undefined 与 '' 比较视为相等
   */
  public isModelEqual(targetData: ModelBase, params?: { ignoreEmptyString?: boolean }) {
    targetData = toRaw(targetData)
    const t_ = toRaw(this)
    const columns = (t_ as any).getColumns()
    const target = t_ as ModelBase
    let flag = true
    Object.keys(columns).forEach((columnName) => {
      let orgColumn = columns[columnName].column
      if (ModelBase.columnNamingMethod === 'camelCase') {
        orgColumn = columns[columnName].camelCaseName
      }
      const targetValue = (targetData as any)[orgColumn]
      const currentValue = (target as any)[orgColumn]
      if (!flag) {
        // 如果发现不相等的值，则停止
        return
      }
      if (typeof targetValue === 'undefined' && typeof currentValue !== 'undefined') {
        flag = !!(params?.ignoreEmptyString && typeof currentValue === 'string' && currentValue === '')
      } else if (typeof currentValue === 'undefined' && typeof targetValue !== 'undefined') {
        flag = !!(params?.ignoreEmptyString && typeof targetValue === 'string' && targetValue === '')
      } else {
        if (JSON.stringify(targetValue) !== JSON.stringify(currentValue)) {
          flag = false
        }
      }
    })
    return flag
  }

  /**
   * @description 待完善
   * @description 判断所有 column 对应的值是相等的。
   * ignoreEmptyString undefined 与 '' 比较视为相等
   */
  public isContainsModel(targetData: ModelBase, params?: { ignoreEmptyString?: boolean }) {
    targetData = toRaw(targetData)
    const t_ = toRaw(this)
    const columns = (t_ as any).getColumns()
    const target = t_ as ModelBase
    let flag = true
    Object.keys(columns).forEach((columnName) => {
      let orgColumn = columns[columnName].column
      if (ModelBase.columnNamingMethod === 'camelCase') {
        orgColumn = columns[columnName].camelCaseName
      }
      const targetValue = (targetData as any)[orgColumn]
      const currentValue = (target as any)[orgColumn]
      if (!flag) {
        // 如果发现不相等的值，则停止
        return
      }
      if (typeof targetValue === 'undefined') {
        // 目标值为空，不比较
        flag = true
      } else if (typeof currentValue === 'undefined' && typeof targetValue !== 'undefined') {
        flag = !!(params?.ignoreEmptyString && typeof targetValue === 'string' && targetValue === '')
      } else {
        if (JSON.stringify(targetValue) !== JSON.stringify(currentValue)) {
          flag = false
        }
      }
    })
    return flag
  }

  /**
   * @description 还原数据到上一个保存点之前，初始化保存点为创建对象的时候。
   */
  public revertChangedData() {
    ModelBase.revertChangedData(this)
    return this
  }

  /**
   * @description 当前对象相对于保存点是否有变化。
   * ignoreEmptyString undefined 变为 '' 视为没有变化
   */
  public isChanged(params?: {
    group?: string
    excludeGroup?: string
    trim?: boolean
    ignoreEmptyString?: boolean
  }) {
    const t_ = toRaw(this)
    return Object.keys(t_.getChangedData(params)).length !== 0
  }

  /**
   * @description 变更保存点，将当前的数据作为最新的保存点。
   */
  public saveChangedData(param?: {
    group?: string
    excludeGroup?: string
    enableDataState?: boolean
  }) {
    const t_ = toRaw(this)
    let dto_ = {}
    const m = Reflect.getOwnMetadata(
      LOCA_DATA_MODEL_KEY,
      t_.constructor,
    ) || {}
    const enableDataState = param?.enableDataState ?? m.enableDataState ?? true
    if (enableDataState) {
      dto_ = modelToSerializableObj(t_, {
        group: param?.group,
        excludeGroup: param?.excludeGroup,
        clean: CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL,
      })
      Reflect.defineMetadata(
        CLONE_KEY,
        deepCopy(dto_),
        t_,
      )
    }
    return this
  }

  /**
   * @description 获得对象被更改前的原始数据。
   */
  public getOriginalData() {
    const t_ = toRaw(this)
    return Reflect.getOwnMetadata(
      CLONE_KEY,
      // (t_ as any).__target__,
      (t_ as any),
    )
  }

  /**
   * @description 获得可被序列化的 object 对象，这个对象去除了 空字符 空对象 空数组。
   */
  public getCleanSerializableObject(params?: {
    group?: string
    excludeGroup?: string
    camelCase?: boolean
    trim?: boolean
  }) {
    const t_ = toRaw(this)
    return modelToSerializableObj(t_, {
      clean: CLEAN_ENUM.CLEAN_DIRTY,
      group: params && params.group,
      excludeGroup: params?.excludeGroup,
      camelCase: params && params.camelCase,
      trim: params && params.trim,
    })
  }

  /**
   * @description 获得可被序列化的 object 对象，这个对象没有去除了 空字符 空对象 空数组。
   * @param params
   * clean 默认 CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL 兼容老的数据
   */
  public getSerializableObject(params?: {
    trim?: boolean
    group?: string
    excludeGroup?: string
    clean?: CLEAN_ENUM
    emptyValue?: any
    emptyValueScope?: any[]
    camelCase?: boolean
  }) {
    const t_ = toRaw(this)
    return modelToSerializableObj(t_, {
      clean: params?.clean ?? CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL,
      group: params?.group,
      excludeGroup: params?.excludeGroup,
      emptyValue: params?.emptyValue,
      emptyValueScope: params?.emptyValueScope,
      camelCase: params?.camelCase,
      trim: params && params.trim,
    })
  }

  /**
   *
   * @description 获得可被序列化的 string 字符串，这个字符串去除了 空字符 空对象 空数组。
   */
  public getCleanSerializableString(param?: {
    group?: string
    excludeGroup?: string
    trim?: boolean
    camelCase?: boolean,
  }) {
    const t_ = toRaw(this)
    return JSON.stringify(t_.getCleanSerializableObject(param))
  }

  /**
   * @description 获得可被序列化的 string 字符串，这个没有字符串去除了 空字符 空对象 空数组。
   */
  public getSerializableString(param?: {
    group?: string
    excludeGroup?: string
    trim?: boolean
    camelCase?: boolean,
  }) {
    const t_ = toRaw(this)
    return JSON.stringify(t_.getSerializableObject(param))
  }

  /**
   * @description 获取在上一个保存点之后的变更数据，这个数据只会包含变化的 column 的键值对。
   * @param params
   * clean 默认 CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL 兼容老的数据
   */
  public getChangedData(params?: {
    group?: string
    excludeGroup?: string
    trim?: boolean
    clean?: CLEAN_ENUM
    descriptor?: boolean
    ignoreEmptyString?: boolean
    camelCase?: boolean
    emptyValue?: any
    emptyValueScope?: any[]
  }) {
    const t_ = toRaw(this)

    const columns = (t_ as any).getColumns()
    const target = t_ as ModelBase
    const targetData = t_.getSerializableObject(params)
    return getChange(columns, target, targetData, {
      ...params,
      clean: params?.clean ?? CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL,
    })
  }

  /**
   * @descriptor 获得变化数据的描述。
   */
  public getChangedDescriptor(params?: {
    group?: string
    excludeGroup?: string
    trim?: boolean
    clean?: CLEAN_ENUM
    ignoreEmptyString?: boolean
    emptyValue?: any
  }) {
    const t_ = (toRaw(this) as any)
    const columns = (t_ as any).getColumns()
    const target = t_ as ModelBase
    const targetData = t_.getSerializableObject(params)
    return getChange(columns, target, targetData, {
      ...params,
      descriptor: true,
      ignoreEmptyString: params?.ignoreEmptyString,
      clean: params?.clean ?? CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL,
    })
  }

  /**
   * @description 当前模型的key存在，就会覆盖，仅支持第一级level的覆盖。如果key是对象，或者数组，覆盖暂时不支持，建议用extendModel。
   * @param model
   */
  public extend(model: any) {
    model = toRaw(model)
    const data: { [index: string]: any } = merge({}, model, {
      clone: true,
    })
    const t_ = toRaw(this)
    const props = (t_ as any).getColumns()
    for (const key in props) {
      if (data.hasOwnProperty(key)) {
        // 此处应该用this，不能用toRaw后的对象，会引起vue对象丢失响应的问题。
        (this as any)[key] = data[key]
      }
    }
    return this
  }

  /**
   * deep: 默认是false，后续实现。
   * @description 当前模型的key对应的值存在，就会覆盖。
   * @param model
   * @param options 待拓展
   */
  public extendModel(model: ModelBase, options?: any) {
    model = toRaw(model)
    const newModel = deepCopy(model)
    const t_ = toRaw(this)
    const props = (t_ as any).getColumns()
    for (const key in props) {
      if (typeof (newModel as any)[key] !== 'undefined') {
        // 此处应该用this，不能用toRaw后的对象，会引起vue对象丢失响应的问题。
        (this as any)[key] = (newModel as any)[key]
      }
    }
    return this
  }

  /**
   * @description 获得 model 的主键集合。
   */
  public getPrimaryKey() {
    const t_ = toRaw(this)
    const primary: any[] = []
    const columns = (t_ as any).getColumns()
    for (const columnName in columns) {
      if (columns.hasOwnProperty(columnName)) {
        const column = columns[columnName]
        if (column.primary) {
          primary.push({
            primaryKey: columnName,
            primaryColumn: column,
          })
        }
      }
    }
    if (primary.length === 0) {
      // console.log(this.constructor.name + '没有设置 primary key');
    }
    return primary
  }

  /**
   * @description 在当前对象中获得主键对应的值集合。
   */
  public getPrimaryValue() {
    const t_ = toRaw(this)
    const target = t_ as any
    const valList: any[] = []
    this.getPrimaryKey().forEach((item: any) => {
      valList.push(target[item.primaryKey])
    })
    return valList
  }

  /**
   * @description 从传入对象中获得主键对应的值集合。
   * @param model
   */
  public getPrimaryValueFromData(model: any) {
    const valList: any[] = []
    this.getPrimaryKey().forEach((item) => {
      let column = item.primaryColumn.column
      if (ModelBase.columnNamingMethod === 'camelCase') {
        column = item.primaryColumn.camelCaseName
      }
      valList.push(model[column])
    })
    return valList
  }

  public getColumns(data?: { dto?: any }) {
    const t_ = toRaw(this)
    let columns_ = {} as { [key: string]: IColumnInner }
    const m = Reflect.getOwnMetadata(
      LOCA_DATA_MODEL_KEY,
      t_.constructor,
    )
    if (m?.columnsInValue) {
      if (data?.dto) {
        columns_ = generateColumnsFromData(t_, data?.dto)
      } else {
        columns_ = generateColumnsFromData(t_, t_)
      }
    }

    // let keys = Object.keys(t_)
    // const columns_ = {} as { [key: string]: IColumnInner }
    if (!Reflect.getOwnMetadata(
      LOCA_COLUMN_KEY,
      t_,
    )) {
      return {}
    }
    if (modelColumnsMap.has(t_.constructor)) {
      return merge(columns_, modelColumnsMap.get(t_.constructor) || {}, {
        clone: true,
      })
    }
    let columns = {} as { [key: string]: IColumnInner }
    columns = merge(columns_, getColumnsUtil(columns, Object.getPrototypeOf(t_)) || {}, {
      clone: true,
    })
    return columns
  }

  public setColumnData(key: string, value: any) {
    const target = this as any
    target[key] = value
    return this
  }

  public getColumnData(key: string) {
    const target = this as any
    return target[key]
  }
}
