export interface IApi {
  get(url: string, body?: any, options?: any): any

  post(url: string, body?: any, options?: any): any

  del(url: string, options?: any): any

  put(url: string, body?: any, options?: any): any

  patch(url: string, body?: any, options?: any): any

  jsonp(url: string, body?: any, options?: any): any
}
