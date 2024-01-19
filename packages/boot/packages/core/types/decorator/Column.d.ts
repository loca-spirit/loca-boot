import 'reflect-metadata';
export declare const LOCA_COLUMN_KEY: unique symbol;
export declare const MODEL_COLUMN_KEY: unique symbol;
export declare const CLONE_KEY: unique symbol;
export interface IColumn {
    name?: string;
    aliasName?: string | symbol;
    childType?: any;
    group?: string | string[];
    model?: any;
    formatter?: any;
    trim?: boolean;
    primary?: boolean;
    foreign?: boolean;
    default?: any;
    autowired?: boolean;
    unformatter?: any;
    extData?: any;
}
export interface IColumnDefined extends IColumn {
    type?: any;
}
export interface IColumnInner extends IColumn {
    camelCaseName: string | symbol;
    type: any;
    column: any;
}
export declare function genTypeByValue(value: any): any;
export declare function generateColumnsFromData(model: any, data: any): {
    [key: string]: IColumnInner;
};
/**
 * @description 设置 primary 的主键的值只能是 string | number, 主键的值理论上不允许为空
 *
 * @description
 *
 * number serialized as Number
 * string serialized as String
 * boolean serialized as Boolean
 * any serialized as Object
 * void serializes as undefined
 * Array serialized as Array
 * If a Tuple, serialized as Array
 * If a class serialized it as the class constructor
 * If an Enum serialized it as Number
 * If has at least one call signature, serialized as Function
 * Otherwise serialized as Object (Including interfaces)
 *
 * @constructor
 * @param col
 */
export declare function Column(col?: IColumn): PropertyDecorator;
