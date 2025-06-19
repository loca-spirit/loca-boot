import { Column, createModel, ModelBase, serialize } from '@model-base/core'
import { DataListWrapper } from '@model-base/service'
import { AppServiceResponse } from './AppServiceResponse'

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
  })
  listModel!: TestModel[]
  @Column({
    model: () => TestChildModel,
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
    const model = new TestModel({
      listModelChild: {
        id: 111,
        name: 'test11',
      },
    })
    model.id = 1
    model.name = 'test'
    model.listModel = []
    const model2 = new TestModel()
    const model3 = new TestModel()
    const model4 = new TestModel()
    model3.id = 3
    model3.name = 'test3'
    model2.id = 2
    model2.listModel = []
    model2.listModel.push(model3)
    model4.id = 4
    model4.name = 'test4'
    model2.listModelChild = model4
    model.mergeModel(model2)
    model.listModel[0].name = 'test511'
    const item = createModel(Item, {
      id: 1,
      name: 'test',
    })
    expect(model.listModelChild.getOriginalData()).toEqual({ id: 111, name: 'test11' })
    expect(item.id).toBe(1)
    expect(model.listModel.length).toBe(1)
    expect(model.id).toBe(2)
    expect(model.name).toBe('test')
    expect(model3.name).toBe('test3')
    expect(model.listModel[0].name).toBe('test511')
    expect(model.listModelChild.id).toBe(4)
    expect(model.listModelChild.name).toBe('test4')
  })
  it('response wrapper', () => {
    const dto = {
      data: [
        {
          id: 1,
          name: 'test',
          list_model: [
            {
              id: 22,
              name: 'test22',
            },
          ],
          list_model_child: {
            id: 111,
            name: 'test11',
          },
        },
      ],
    }
    const model = new AppServiceResponse(
      dto,
      new DataListWrapper({
        itemType: TestModel,
      }),
    )
    expect(serialize(model.data)).toEqual(dto.data)
  })
})
