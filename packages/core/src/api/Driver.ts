import { IApi } from './IApi'
import { IDriver } from './IDriver'

export class Driver implements IDriver {
  public adapter: {
    api: IApi
    url: string
  } = {
    api: {} as IApi,
    url: '',
  }

  constructor(adapter: { api: IApi; url: string }) {
    this.adapter.url = adapter.url
    this.adapter.api = adapter.api
  }

  public getApi() {
    return this.adapter.api
  }

  public getUrl() {
    return this.adapter.url
  }
}
