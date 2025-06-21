import { type ServiceResponse } from './ServiceResponse'
import { Wrapper } from './Wrapper'

export class DataStreamWrapper extends Wrapper {
  public dataType?: 'blob' | 'stream' | 'objectURL'
  public responseType?: 'blob' | 'arraybuffer' | 'json' | 'document' | 'text'
  public responseObj?: 'blob' | 'objectURL' | 'arraybuffer'
  public autoParseJson?: boolean
  public responseObjOptions?: any

  constructor(data?: {
    /**
     * @deprecated 已经舍弃，建议用 responseType 和 responseObj 进行组合。
     */
    dataType?: 'blob' | 'stream' | 'objectURL'
    /**
     * 不能和 dataType 同时使用。
     * 默认值是 blob。
     * 搭配方式：
     * responseType: 'blob', responseObj: 'blob'， responseObj不用传。
     * responseType: 'blob', responseObj: 'objectURL'
     * responseType: 'arraybuffer', blob: ''
     * responseType: 'arraybuffer', objectURL: ''
     */
    responseType?: 'blob' | 'arraybuffer'
    /**
     * 不能和 dataType 同时使用。
     * 默认值是 blob。
     * responseType: 'blob', responseObj: 'blob'， responseObj不用传。
     * responseType: 'blob', responseObj: 'objectURL'
     * responseType: 'arraybuffer', blob: ''
     * responseType: 'arraybuffer', objectURL: ''
     */
    responseObj?: 'blob' | 'arraybuffer' | 'objectURL'
    /**
     * 待拓展项目，目前设置参数包括 type。
     * 比如 responseObj 为 blob 的时候，可以设置，如：
     * {
     *  responseObjOptions: {
     *    type: 'application/octet-stream',
     *  }
     * }
     * 最终结果：
     * new Blob([dto], {
     *  type: this.responseObjOptions.type || '',
     *  })
     *
     */
    responseObjOptions?: { type: string }
    /**
     * 不能和 dataType 同时使用。
     * 默认值是 true。后端的 content-type 里面包含 'application/json' 的时候生效。
     */
    autoParseJson?: boolean
  }) {
    super()
    // 优先判断 dataType是否为空，如果为空，则可以设置其他参数的默认值。
    if (data && !data.dataType) {
      this.responseType = data.responseType ?? 'blob'
      this.responseObj = data.responseObj ?? 'blob'
      this.responseObjOptions = data?.responseObjOptions ?? {}
      this.autoParseJson = data?.autoParseJson ?? true
    }
    if (data) {
      this.dataType = data.dataType || 'stream'
    }
    this.dataType = this.dataType || 'stream'
  }

  public processParams(params?: any) {
    params = params || {}
    params.options = params.options || {}
    params.options.responseType = params.options.responseType || this.responseType
    return params
  }

  public processData(response: ServiceResponse, res: any) {
    const dto = res
    // content-type 不存在或者 不包含 application/json，则按照 blob的处理方式处理。
    if (!res?.headers?.['content-type'] || res?.headers?.['content-type']?.indexOf('application/json') === -1) {
      let newObj = dto
      if (dto) {
        if (this.responseType) {
          // 默认只处理 responseType 是 blob 和 arraybuffer 的情况，以及 responseObj 是 blob 和 objectURL 的情况。
          if (this.responseType === 'blob' && this.responseObj === 'objectURL') {
            newObj = window.URL.createObjectURL(dto)
          } else if (this.responseType === 'arraybuffer' && this.responseObj === 'blob') {
            newObj = new Blob([dto], {
              type: this.responseObjOptions.type || '',
            })
          } else if (this.responseType === 'arraybuffer' && this.responseObj === 'objectURL') {
            newObj = window.URL.createObjectURL(
              new Blob([dto], {
                type: this.responseObjOptions.type || '',
              }),
            )
          }
        } else {
          if (this.dataType === 'blob') {
            newObj = new Blob([dto])
          }
          if (this.dataType === 'objectURL') {
            newObj = window.URL.createObjectURL(new Blob([dto]))
          }
        }
        response.resultCode = response.resultCode || 'success'
      } else {
        response.resultCode = 'stream_is_empty'
      }
      // stream默认是没有data属性，dto需要设置到data上
      response.data = newObj
    }
    if (
      this.autoParseJson &&
      // 兼容老版本没有 headers 的情况。
      response.headers &&
      response.headers['content-type']?.indexOf('application/json') !== -1
    ) {
      if (this.responseType === 'blob') {
        response.data = JSON.parse(response.data as any)
      }
      if (this.responseType === 'arraybuffer') {
        const array = Buffer.from(response.data as any)
        const enc = new TextDecoder('utf-8')
        response.data = JSON.parse(enc.decode(array))
      }
    }
  }
}
