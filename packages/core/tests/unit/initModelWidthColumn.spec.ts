import { ModelBase, dynamicModelBase } from 'loca-boot-core'

describe('ModelBase', () => {
  describe('saveChangedData', () => {
    it('consumerList: ConsumerItem[], push one item to list, then save changed.', async () => {
      function test1() {
        const columns = {
          data: {
            type: 'object',
            model: {
              result_list: {
                type: 'array',
                autowired: true,
                model: {
                  id: {
                    type: 'number',
                  },
                  model: {
                    type: 'string',
                  },
                  worksheet_level: {
                    type: 'number',
                  },
                  worksheet_name: {
                    type: 'string',
                  },
                  map_rule: {
                    type: 'number',
                  },
                  active: {
                    type: 'boolean',
                  },
                  assignee_type: {
                    type: 'number',
                  },
                },
              },
              total_results: {
                type: 'number',
              },
            },
          },
          result_code: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        }
        const model1 = new (dynamicModelBase(columns))({
          data: {
            result_list: [
              {
                id: 'shuai meng1',
              },
              {
                id: 'shuai meng2',
              },
            ],
            total_results: 10,
          },
          result_code: 'success',
        })
        model1.saveChangedData()
        ;(model1 as any).data.result_list[0].id = 'shuai meng4'
        model1.revertChangedData()
        expect((model1 as any).data.result_list[0].id).toBe('shuai meng1')
        // test autowired
        const model2 = new (dynamicModelBase(columns))({
          data: {
            total_results: 10,
          },
          result_code: 'success',
        })
        expect((model2 as any).data.result_list).toEqual([])
        expect((model2 as any).data.total_results).toEqual(10)
      }

      function test2() {
        const columns = {
          user_item: {
            type: 'string',
          },
        }
        const model2 = new (dynamicModelBase(columns))()
        ;(model2 as any).user_item = 6
        model2.saveChangedData()
        ;(model2 as any).user_item = 8
        model2.revertChangedData()
        expect((model2 as any).user_item).toBe(6)
      }

      test1()
      test2()
    })
  })
})
