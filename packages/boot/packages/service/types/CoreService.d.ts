import { DataWrapper, Driver, ModelBase, ServiceResponse } from 'loca-boot-core';
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
    params?: ModelBase | any;
    options?: any;
    beforeParse?: (dto: any) => any;
    afterParse?: (serviceResponse: ServiceResponse<T>) => ServiceResponse<T>;
    wrapper?: DataWrapper | (new (dto: any) => T) | T[];
}
export interface IServiceParamRequest<T> extends IServiceParam<T> {
    type?: 'get' | 'post' | 'del' | 'put' | 'patch';
}
export declare class CoreService {
    private driver;
    constructor(adapter: Driver);
    get<T>(url: string, data?: IServiceParam<T>): Promise<ServiceResponse<T>>;
    post<T>(url: string, data?: IServiceParam<T>): Promise<ServiceResponse<T>>;
    del<T>(url: string, data?: IServiceParam<T>): Promise<ServiceResponse<T>>;
    put<T>(url: string, data?: IServiceParam<T>): Promise<ServiceResponse<T>>;
    patch<T>(url: string, data?: IServiceParam<T>): Promise<ServiceResponse<T>>;
    request<T extends any>(url: string, param?: IServiceParamRequest<T>): Promise<ServiceResponse<T>>;
    private req;
}
