import { DataWrapper } from './DataWrapper';
export declare class DataListWrapper extends DataWrapper {
    static className: string;
    protected itemType: any;
    constructor(data?: {
        itemType: any;
    } | any);
    getClassName(): string;
    getData(dto: any): any;
}
