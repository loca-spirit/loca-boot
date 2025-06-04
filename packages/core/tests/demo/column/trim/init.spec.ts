import { Column, ModelBase } from "@model-base/core"

describe("trim", () => {
  class Test extends ModelBase {
    @Column({ trim: true })
    public name?: string

    @Column()
    public id?: string
  }

  const test = new Test({
    name: " Tongyu Liu ",
    id: " 123 ",
  })
  console.log(test.getSerializableObject().name)
  it("前后去空格", () => {
    expect(test.getSerializableObject({ trim: true })).toEqual({
      name: "Tongyu Liu",
      id: " 123 ",
    }) // PASS
  })
})
