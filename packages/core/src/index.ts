import { ModelBase } from './model'

export * from 'loca-boot-common'
export * from './PageMemory'
export * from './utils/modelTool'
export * from './api'
export * from './decorator'
export * from './model'
export * from './utils/lib'

type ElementOf<T> = T extends Array<infer E> ? E : never;
export const propertiesOf = <TObj>(_obj: (TObj | undefined) = undefined) => <T extends keyof TObj>(name: T): T => name

export function getDataList<T = any>(data: ModelBase[], itemType: (new(dto: any) => ElementOf<T>)) {
  const list: Array<ElementOf<T>> = []
  data && data.forEach((item) => {
    list.push(new itemType(item.getSerializableObject()))
  })
  return list as unknown as T
}

export function getDataObj<T>(data: { [key: string]: ModelBase }, itemType: (new(dto: any) => any)) {
  const obj: any = {}
  data && Object.keys(data).forEach((property) => {
    obj[property] = new itemType(data[property].getSerializableObject())
  })
  return obj as T
}

export function getData<T = any>(data: ModelBase, type: (new(dto: any) => T)) {
  return new type(data.getSerializableObject())
}
