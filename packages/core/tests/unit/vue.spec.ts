// import { nextTick, ref, watch } from 'vue'
import { VueChildModel, VueModel } from './model/vue.model'

describe('vue', () => {
  describe('ref', () => {
    it('extendModel', () => {
      // const m1 = ref(new VueModel())
      // const m2 = ref(new VueModel({ id: 1 }))
      // const m3 = ref(new VueModel({ id: 1, listModel: [{ id: 1 }] }))
      const m4 = new VueModel({ id: 2, listModel: [] })
      // m1.value.extendModel(m2.value)
      // m3.value.extendModel(m4)
      // const m = new VueChildModel({})
      // m.id = 2
      // m4.listModel.push(m)
      // m3.value.listModel[0].id = 3
      // m3.value.extendModel(m3.value)
      // nextTick(() => {
      //   // m.id = 5
      //   m3.value.listModel[0].id = 4
      //   console.log('next', m3.value.listModel[0].id)
      // })
      // watch(
      //   () => m3.value,
      //   () => {
      //     m2.value = m3.value
      //     console.log('change', m2.value.listModel[0].id)
      //   },
      //   { immediate: true, deep: true },
      // )
      // setTimeout(() => {
      //   // m.id = 5
      //   m3.value.listModel[0].id = 6
      //   console.log('next', m3.value.listModel[0].id)
      // }, 1000)
      // expect(m1.value.id).toBe(1)
      // expect(m3.value.id).toBe(2)
      // expect(m3.value.listModel[0].id).toBe(3)
    })
  })
})
