import { setDefaultList, setModelBaseDefault } from './util'
import { ColumnTest } from './model/columnAnnotation/ColumnTest'
import { ColumnTestItem } from './model/columnAnnotation/ColumnTestItem'

describe('ModelBase', () => {
  afterEach(() => {
    setModelBaseDefault()
  })
  describe('constructor', () => {
    it('columnNamingMethod is undefined', () => {
      const columnTest = new ColumnTest()
      const columns = columnTest.getColumns()
      const obj = {
        tst: {
          column: 'tst',
          camelCaseName: 'tst',
          type: String,
        },
        userName: {
          column: 'user_name',
          camelCaseName: 'userName',
          type: String,
        },
        obj: {
          column: 'obj',
          camelCaseName: 'obj',
          type: ColumnTestItem,
          default: true,
          childType: ColumnTestItem,
        },
        consumerList: {
          column: 'consumer_list',
          camelCaseName: 'consumerList',
          type: Array,
          default: setDefaultList,
          childType: ColumnTestItem,
        },
      }
      expect(columns).toEqual(obj)
    })
  })
})
