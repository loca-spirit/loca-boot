import { cloneDeep } from 'lodash'
import { ColumnTest } from './model/columnAnnotation/ColumnTest'
import { ColumnTestItem } from './model/columnAnnotation/ColumnTestItem'
import { setDefaultList, setModelBaseDefault } from './util'

describe('ModelBase', () => {
  afterEach(() => {
    setModelBaseDefault()
  })
  describe('constructor', () => {
    it('columnNamingMethod is undefined', () => {
      const columnTest = new ColumnTest()
      const columns = columnTest.getColumns()
      const columns_ = cloneDeep(columns)
      const obj = {
        tst: {
          column: 'tst',
          camelCaseName: 'tst',
          // type: String,
        },
        userName: {
          column: 'user_name',
          camelCaseName: 'userName',
          // type: String,
        },
        obj: {
          column: 'obj',
          camelCaseName: 'obj',
          // type: ColumnTestItem,
          autowired: true,
          // childType: () => ColumnTestItem,
        },
        consumerList: {
          column: 'consumer_list',
          camelCaseName: 'consumerList',
          // type: Array,
          default: setDefaultList,
          // childType: () => ColumnTestItem,
        },
      }
      Object.keys(columns_).forEach((key) => {
        delete columns_[key].childType
        delete columns_[key].type
      })
      expect(columns_).toEqual(obj)
    })
  })
})
