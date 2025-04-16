import { Column, DataModel, ModelBase } from "loca-boot-core"

@DataModel({
  methods: {
    fn: '{{$model.a = "123"}}',
  },
})
class Test extends ModelBase {
  @Column()
  public a!: string
}

describe("callMethod", () => {
  const test = new Test()
  test.callMethod({ method: "fn" })
  it("执行DataModel中声明的方法", () => {
    expect(test).toEqual({
      a: "123",
    })
  })
})
