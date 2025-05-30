import { Column, DataModel, dynamicModelBase, ModelBase } from 'loca-boot-core'

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
      DataModel({ columnsInValue: true })(PrimClass)
      const data = new PrimClass({ a: 1 }, { keepModelName: true, columnsInValue: true }) as any
      data.aData = '1232'
      data.xx_data = '1232'
      data.b = 1212
      data.c = {
        x: 1,
      }
      data.d = true
      expect(data.getChangedData()).toEqual(expectData)
    })
  })
  it('emptyValue', () => {
    const expectData1 = {
      a: '',
      b: '',
    }
    const fData = new (dynamicModelBase({ a: { type: 'number' }, b: { type: 'boolean' } }))({
      a: 1,
      b: false,
    }) as any
    fData.a = null as any
    fData.b = undefined as any
    expect(
      fData.getChangedData({
        emptyValue: '',
        emptyValueScope: [Number, Boolean],
        // clean: CLEAN_ENUM.CLEAN_UNDEFINED,
      }),
    ).toEqual(expectData1)
  })
})
