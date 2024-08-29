import { ServiceResponse } from './ServiceResponse';
export declare class GraphqlResponse<T = any> extends ServiceResponse<T> {
    getMessage(): string;
}
