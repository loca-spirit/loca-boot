import { Column, ModelBase } from 'loca-boot-core'
// region model
class TestItem extends ModelBase {
  @Column()
  public id?: string

  @Column()
  public msg?: string

  @Column()
  public name?: string
}
class Test extends ModelBase {
  @Column({
    model: () => TestItem,
  })
  public list!: TestItem[]
}
// endregion model

// region instance
const test = new Test({
  list: [
    {
      id: '1',
    },
    {
      id: '2',
      msg: 'message2',
    },
    {
      id: '4',
      msg: 'message4',
    },
  ],
})
// endregion instance

// region change
// update id 2
test.list[1].setColumnData('msg', undefined)
test.list[1].name = 'newName'
// add id 3
const cItem = new TestItem({ id: '3' })
cItem.msg = 'message3'
test.list.push(cItem)
// remove id 4
test.list = test.list.filter((item) => {
  if (item.id !== '4') {
    return true
  }
})
// endregion change

// region log
console.log(test.getChangedDescriptor())
/* 
  {
    list:{
      action: 'UPDATE',
      changeDescriptor: {
        update: [
          { id: '1' }, 
          { id: '2', name: 'newName' },
          { id: '3', message: 'message3' },
        ]
      },
      currentValue: [
        { id: "1" },
        { id: "2", name: "newName" },
        { id: "3", msg: "message3"} 
      ],
      dataKey: 'list',
      oldValue: [
        { id: "1" },
        { id: "2", msg: "message2", },
        { id: "4", msg: "message4", },
      ],
    }
  }
*/
// endregion log
