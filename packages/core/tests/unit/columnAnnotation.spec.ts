import { cloneDeep } from 'lodash'
import { ColumnTest } from './model/columnAnnotation/ColumnTest'

describe('constructor', () => {
  it('serializeNamingStrategies is undefined', () => {
    const columnTest = new ColumnTest()
    const columns = columnTest.getColumns()
    const columns_ = cloneDeep(columns)
    const obj = {
      tst: {
        name: 'tst',
        camelCaseName: 'tst',
        // type: String,
      },
      userName: {
        name: 'user_name',
        camelCaseName: 'userName',
        // type: String,
      },
      obj: {
        name: 'obj',
        camelCaseName: 'obj',
        // type: ColumnTestItem,
        autowired: true,
        // childType: () => ColumnTestItem,
      },
      consumerList: {
        name: 'consumer_list',
        camelCaseName: 'consumerList',
        // type: Array,
        default: () => [],
        // childType: () => ColumnTestItem,
      },
    }
    Object.keys(columns_).forEach((key) => {
      delete columns_[key].childType
      delete columns_[key].type
      delete columns_[key].default
      delete columns_[key].camelCaseAliasName
      delete obj[key].default
    })
    expect(columns_).toEqual(obj)
  })
})
