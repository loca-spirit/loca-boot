import { Column, createModel, ModelBase } from 'loca-boot-core'
class TestChildModel extends ModelBase {
  @Column()
  id!: number
  @Column()
  name!: string
}

class TestModel extends ModelBase {
  @Column()
  id!: number
  @Column()
  name!: string
  @Column({
    model: () => TestModel,
    default: () => [],
  })
  listModel!: TestModel[]
  @Column({
    model: () => TestChildModel,
    autowired: true,
  })
  listModelChild!: TestChildModel
}
class Item extends ModelBase {
  @Column()
  id!: number
  @Column()
  name!: string
}
describe('extendModel', () => {
  it('extendModel', () => {
    const model = new TestModel()
    model.id = 1
    model.name = 'test'
    const model2 = new TestModel()
    const model3 = new TestModel()
    const model4 = new TestModel()
    model3.id = 3
    model3.name = 'test3'
    model2.id = 2
    model2.listModel.push(model3)
    model4.id = 4
    model4.name = 'test4'
    model2.listModelChild = model4
    model.mergeModel(model2)
    model.listModel[0].name = 'test511'
    console.log(model.listModelChild)
    const item = createModel(Item, {
      id: 1,
      name: 'test',
    })
    expect(item.id).toBe(1)
    expect(model.listModel.length).toBe(1)
    expect(model.id).toBe(2)
    expect(model.name).toBe('test')
    expect(model3.name).toBe('test3')
    expect(model.listModel[0].name).toBe('test511')
    expect(model.listModelChild.id).toBe(4)
    expect(model.listModelChild.name).toBe('test4')
  })
})
