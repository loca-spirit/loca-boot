import { ModelBase } from '../ModelBase';
import { DataWrapper } from './DataWrapper';
export declare class ServiceResponse<T = any> extends ModelBase {
    serverTime: number;
    requestId: string;
    config: any;
    headers: any;
    request: any;
    driverType: string;
    status: number;
    statusText: string;
    resultCode: string;
    message: string;
    encryptType: number;
    data: T;
    serviceError: Error;
    constructor(dto?: any, wrapper?: DataWrapper | (new (dto: any) => T) | T[]);
    isValid(): boolean;
}
