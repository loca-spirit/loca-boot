import { IColumnInner } from '../decorator';
import { CLEAN_ENUM, ModelBase } from '../model';
export declare function getChange(columns: {
    [key: string]: IColumnInner;
}, target: ModelBase, targetData: any, params: {
    group?: string;
    excludeGroup?: string;
    trim?: boolean;
    descriptor?: boolean;
    clean?: CLEAN_ENUM;
    ignoreEmptyString?: boolean;
    emptyValue?: any;
    emptyValueScope?: any[];
    camelCase?: boolean;
}): {
    [key: string]: any;
};
