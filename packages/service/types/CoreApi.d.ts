import { BaseApi, ModelBase } from 'packages/packages/core';
export declare class CoreApi extends BaseApi {
    request(url: string, data: {
        type: 'get' | 'post' | 'del' | 'put';
        params?: ModelBase | any;
        options?: any;
    }): any;
}
