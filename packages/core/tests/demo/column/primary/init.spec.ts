import { Column, ModelBase } from 'loca-boot-core'

describe('init', () => {
  class Consumer extends ModelBase {
    @Column()
    public id?: number

    @Column()
    public userName?: string
  }

  it('should create a consumer with a valid username', () => {
    const consumer = new Consumer({
      id: 1,
      userName: 'John Doe',
    })

    expect(consumer.id).toBe(1)
    expect(consumer.userName).toBe('John Doe')
  })
  it('should trim whitespace from the username when saving', () => {
    const consumer = new Consumer({
      id: 1,
      userName: 'Alice Smith',
    })

    expect(consumer.id).toBe(1)
    expect(consumer.userName).toBe('Alice Smith')
  })
  it('should store the username as null if an empty string is provided', () => {
    const consumer = new Consumer({
      id: 2,
      userName: '',
    })

    expect(consumer.id).toBe(2)
    expect(consumer.userName).toEqual('')
  })
  it('should allow updating the username of an existing consumer', () => {
    const consumer = new Consumer({
      id: 1,
      userName: 'John Doe',
    })

    consumer.userName = 'Jane Smith'

    expect(consumer.id).toBe(1)
    expect(consumer.userName).toBe('Jane Smith')
  })
})
