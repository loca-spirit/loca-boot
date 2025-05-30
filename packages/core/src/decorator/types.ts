export interface IColumn {
  name?: string
  type?: any
  aliasName?: string | symbol
  childType?: any
  group?: string | string[]
  model?: any
  formatter?: any
  serialize?: (data: { value: any; key: string; data: any }) => any
  trim?: boolean
  primary?: boolean
  foreign?: boolean
  default?: any
  autowired?: boolean
  unformatter?: any
  deserialize?: (data: { value: any; key: string; data: any }) => any
  extData?: any
}

export interface IColumnDefined extends IColumn {
  type?: any
}

export interface IColumnInner extends IColumn {
  camelCaseName: string | symbol
  type: any
  column: any
}

export interface IDataModel {
  methods?: { [key: string]: any }
  keepModelName?: boolean
  columnsInValue?: boolean
  enableDataState?: boolean
}
