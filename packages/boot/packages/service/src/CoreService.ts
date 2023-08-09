import { DataStreamWrapper, DataWrapper, Driver, ModelBase, ServiceResponse } from 'loca-boot-core'

/**
 * options: {
 *   allowEmptyData: 是否允许提交空数据 前提是params为ModelBase类型
 *   headers: {
 *     'Content-Type': 'multipart/form-data',
 *   },
 * },
 * wrapper: 解析返回数据
 */
export interface IServiceParam<T> {
  params?: ModelBase | any
  options?: any
  beforeParse?: (dto: any) => any
  afterParse?: (serviceResponse: ServiceResponse<T>) => ServiceResponse<T>
  wrapper?: DataWrapper |
    // IWrapperType |
    (new(dto: any) => T) |
    T[]
}

export interface IServiceParamRequest<T> extends IServiceParam<T> {
  type?: 'get' | 'post' | 'del' | 'put' | 'patch'
}

export class CoreService {
  private driver!: Driver

  constructor(adapter: Driver) {
    this.driver = adapter
  }

  public get<T>(url: string, data?: IServiceParam<T>) {
    data = data || {}
    return this.request<T>(url, { ...data, type: 'get' })
  }

  public post<T>(url: string, data?: IServiceParam<T>) {
    data = data || {}
    return this.request<T>(url, { ...data, type: 'post' })
  }

  public del<T>(url: string, data?: IServiceParam<T>) {
    data = data || {}
    return this.request<T>(url, { ...data, type: 'del' })
  }

  public put<T>(url: string, data?: IServiceParam<T>) {
    data = data || {}
    return this.request<T>(url, { ...data, type: 'put' })
  }

  public patch<T>(url: string, data?: IServiceParam<T>) {
    data = data || {}
    return this.request<T>(url, { ...data, type: 'patch' })
  }


  public async request<T extends any>(url: string, param?: IServiceParamRequest<T>) {
    let apiData
    if (param &&
      param.wrapper &&
      (param?.wrapper as any).getClassName &&
      (param?.wrapper as any).getClassName() === DataStreamWrapper.className) {
      param.options = param.options || {}
      param.options.responseType = param.options.responseType || (param?.wrapper as DataStreamWrapper).responseType
    }
    try {
      apiData = await this.req(url, {
        type: param?.type || 'get',
        params: param?.params,
        options: param?.options,
      })
      if (param?.beforeParse) {
        apiData = param.beforeParse(apiData)
      }
      let serviceResponse = new ServiceResponse<T>(apiData, param?.wrapper)
      if (param?.afterParse) {
        serviceResponse = param.afterParse.call(null, serviceResponse)
      }
      const wrapper = (param?.wrapper as any)
      if (param &&
        param.wrapper &&
        wrapper.getClassName &&
        wrapper.getClassName() === DataStreamWrapper.className) {
        if ((wrapper as DataStreamWrapper).autoParseJson &&
          // 兼容老版本没有 headers 的情况。
          serviceResponse.headers &&
          serviceResponse.headers['content-type']?.indexOf('application/json') !== -1) {
          if ((wrapper as DataStreamWrapper).responseType === 'blob') {
            serviceResponse.data = JSON.parse(serviceResponse.data as any)
          }
          if ((wrapper as DataStreamWrapper).responseType === 'arraybuffer') {
            const array = Buffer.from(serviceResponse.data as any)
            const enc = new TextDecoder('utf-8')
            serviceResponse.data = JSON.parse(enc.decode(array))
          }
        }
      }
      return serviceResponse
    } catch (e: any) {
      if (e.result_code) {
        throw new ServiceResponse<T>(e)
      } else {
        const serviceResponse = new ServiceResponse<T>({
          result_code: 'service_error',
        })
        serviceResponse.serviceError = e
        throw serviceResponse
      }
    }
  }

  private req(url: string, data: {
    type: 'get' | 'post' | 'del' | 'put' | 'patch',
    params?: ModelBase | any,
    options?: any,
  }) {
    let params = data.params
    if (params instanceof ModelBase) {
      if (data.options && data.options.allowEmptyData) {
        params = data.params?.getSerializableObject()
      } else {
        params = data.params?.getCleanSerializableObject()
      }
    }
    return this.driver.getApi()[data.type](url, params, data.options)
  }
}
