import { DataWrapper } from './DataWrapper';
export declare class DataObjectWrapper extends DataWrapper {
    static className: string;
    protected itemType: any;
    protected itemTypeIsArray?: boolean;
    protected isPlainData?: boolean;
    constructor(data?: {
        itemType: any;
        itemTypeIsArray: boolean;
        isPlainData?: boolean;
    });
    getClassName(): string;
    getData(dto: any): any;
}
