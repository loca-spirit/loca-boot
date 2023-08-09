import { DataWrapper } from './DataWrapper';
export declare class DataGraphqlWrapper extends DataWrapper {
    static className: string;
    protected itemType: any;
    protected mappingType: {
        [key: string]: any;
    };
    constructor(data?: {
        itemType: any;
        mappingType: {
            [key: string]: any;
        } | any;
    } | any);
    getClassName(): string;
    getData(dto: any): any;
}
