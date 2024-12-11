import { Consumer } from './model/Consumer'
import { ModelBase, DataModel, Column, dynamicModelBase } from 'loca-boot-core'

describe('columnsInValue', () => {
  describe('keepModelName', () => {
    it('keepModelName', () => {
      const expectData = {
        aData: '1232',
        xx_data: '1232',
        b: 1212,
        c: { x: 1 },
        d: true,
      }

      // console.log('new VerboseClass()', new VerboseClass())
      // @DataModel({
      //     columnsInValue: true
      //   },
      // )
      class PrimClass extends ModelBase {
        @Column()
        valData!: number
      }

      const fData = new (dynamicModelBase({ a: { type: 'string' } }))({
        a: 1,
        b: 323,
      })

      // DataModel({ columnsInValue: true })(PrimClass)
      const data = new PrimClass(
        { a: 1 },
        { keepModelName: true, columnsInValue: true }
      ) as any
      data.aData = '1232'
      data.xx_data = '1232'
      data.b = 1212
      data.c = {
        x: 1,
      }
      data.d = true
      console.log('getChangedData:', data.getChangedData())
      console.log('getColumns:', data.getColumns())
      expect(data.getChangedData()).toEqual(expectData)
    })
  })
})
