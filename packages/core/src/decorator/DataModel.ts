import 'reflect-metadata'
import { __MODEL__ } from '../constant'
import { IDataModel } from './types'

export const LOCA_DATA_MODEL_KEY = Symbol('locaDataModelKey')

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
