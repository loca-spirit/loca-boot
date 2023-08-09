/**
 * Created by shuai.meng on 2017/8/2.
 */
import { ModelBase } from '../model';
import { IColumnInner } from '../decorator';
export interface IModelOptions {
    noDefault?: boolean;
    enableDataState?: boolean;
    keepModelName?: boolean;
    columnsInValue?: boolean;
    dtoNamingMethod?: string;
    group?: string;
    excludeGroup?: string;
    current?: {
        enableDataState?: boolean;
        keepModelName?: boolean;
        columnsInValue?: boolean;
    };
}
export interface IModelUpdateOptions {
    group?: string;
    excludeGroup?: string;
    current?: {
        enableDataState?: boolean;
        keepModelName?: boolean;
        columnsInValue?: boolean;
    };
}
export declare function deepCopy(aObject: any): any;
export declare function getColumnByKey(model: any, key: string, columns: {
    [key: string]: IColumnInner;
}, param: {
    camelCase?: boolean;
}): any;
/**
 * @description 创建子对象
 *
 * @param model
 * @param field
 * @param key
 * @param modelDTO
 */
export declare function createChildField(model: any, field: IColumnInner, key: string, modelDTO: any, options?: IModelOptions): any;
export declare function createModelByDTO(model: ModelBase, props: any, dto: any, options?: IModelOptions): void;
export declare function extendModelByDTO(model: ModelBase, props: any, dto: any, options?: IModelOptions): void;
export declare function updateModelByDTO(model: ModelBase, props: any, dto: any, options?: IModelUpdateOptions): void;
