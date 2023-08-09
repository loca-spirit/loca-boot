import 'reflect-metadata';
export declare const LOCA_DATA_MODEL_KEY: unique symbol;
export interface IDataModel {
    methods?: {
        [key: string]: any;
    };
    keepModelName?: boolean;
    columnsInValue?: boolean;
    enableDataState?: boolean;
}
export declare function DataModel(params?: IDataModel): ClassDecorator;
