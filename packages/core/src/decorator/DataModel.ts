import 'reflect-metadata'
import { __MODEL__ } from '../constant'

export const LOCA_DATA_MODEL_KEY = Symbol('locaDataModelKey')

export interface IDataModel {
  methods?: { [key: string]: any }
  keepModelName?: boolean
  columnsInValue?: boolean
  enableDataState?: boolean
}

export function DataModel(params?: IDataModel): ClassDecorator {
  return <TFunction extends Function>(constructor: TFunction) => {
    const model = {
      methods: params?.methods || {},
      columnsInValue: params?.columnsInValue,
      keepModelName: params?.keepModelName,
      enableDataState: params?.enableDataState,
    } as IDataModel
    ;(constructor as any)[__MODEL__] = model
  }
}
