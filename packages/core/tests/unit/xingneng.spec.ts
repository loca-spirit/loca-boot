import { AliseName } from './model/AliseName'
import { BigData } from './model/BigData'
import { BigData1 } from './model/BigData1'

describe('xingneng', () => {
  describe('count', () => {
    // it('AliseName', () => {
    //   const date1 = new Date()
    //   for (let i = 0; i < 200000; i++) {
    //     const c = new AliseName({ userName1: 'shuai.meng1', user_name2: 'shuai.meng2' })
    //   }
    //   const date2 = new Date()
    //   console.log('diff:', date2.getTime() - date1.getTime())
    // })
    // it('AliseName', () => {
    //   const date1 = new Date()
    //   for (let i = 0; i < 200000; i++) {
    //     const c = { userName1: 'shuai.meng1', user_name2: 'shuai.meng2' }
    //   }
    //   const date2 = new Date()
    //   console.log('diff:', date2.getTime() - date1.getTime())
    // })
    it('BigData', () => {
      const date1 = new Date()
      for (let i = 0; i < 200000; i++) {
        const c = new BigData({
          user_name: 'org',
          phoneNumber: '031-3939234',
          consumerObject: { id: 1, message: '3' },
          consumerList: [
            { id: 2, message: '3' },
            { id: 3, message: '3' },
            { id: 4, message: '3' },
            { id: 5, message: '3' },
          ],
        })
      }
      const date2 = new Date()
      console.log('diff:', date2.getTime() - date1.getTime())
    })
    it('BigData1', () => {
      const date1 = new Date()
      for (let i = 0; i < 200000; i++) {
        const c = new BigData1(
          {
            user_name: 'org',
            phoneNumber: '031-3939234',
            consumerObject: { id: 1, message: '3' },
            consumerList: [
              { id: 2, message: '3' },
              { id: 3, message: '3' },
              { id: 4, message: '3' },
              { id: 5, message: '3' },
            ],
          },
          { current: { enableDataState: false } },
        )
      }
      const date2 = new Date()
      console.log('diff:', date2.getTime() - date1.getTime())
    })
  })
})
