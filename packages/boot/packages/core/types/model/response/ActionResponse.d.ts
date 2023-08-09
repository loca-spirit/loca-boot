import { ServiceResponse } from './ServiceResponse';
export declare class ActionResponse<T = any> extends ServiceResponse {
    constructor(res: ServiceResponse<T>, resolve?: (res: ServiceResponse<T>) => void, reject?: any);
}
