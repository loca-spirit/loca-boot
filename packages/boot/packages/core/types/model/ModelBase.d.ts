import { IModelOptions } from '../utils/ModelBaseUtil';
export declare const ModelColumns: {
    [key: string]: any[];
};
export declare const modelColumnsMap: WeakMap<object, any>;
export interface IDataByOriginalOption extends IModelOptions {
    keepBackUp?: boolean;
}
export declare enum CLEAN_ENUM {
    CLEAN_UNDEFINED = "cleanUndefined",
    CLEAN_UNDEFINED_AND_NULL = "cleanUndefinedAndNull",
    CLEAN_DIRTY = "cleanDirty"
}
export declare class ModelBase {
    static columnNamingMethod: string;
    static dtoNamingMethod: string;
    /**
     * @description 还原数据到上一个保存点之前，初始化保存点为创建对象的时候。
     */
    static revertChangedData(target: ModelBase | ModelBase[] | {
        [key: string]: ModelBase;
    }): typeof ModelBase;
    static resetDefault(target: ModelBase | ModelBase[] | {
        [key: string]: ModelBase;
    }): typeof ModelBase;
    static resetDefaultObject(target: ModelBase, options?: IModelOptions): typeof ModelBase;
    static revertChangedDataObject(target: ModelBase): typeof ModelBase;
    static callMethod(data: ModelBase | ModelBase[], params: {
        method: string;
        camelCase?: boolean;
    }): void;
    constructor(dto?: any, options?: IModelOptions);
    callMethod(params: {
        method: string;
        camelCase?: boolean;
    }): void;
    update(dto: any): this;
    setDataByOriginal(dto: any, options?: IDataByOriginalOption): this;
    /**
     * @description 整个对象是否相等，需要子类自己实现。
     * ignoreEmptyString undefined 与 '' 比较视为相等
     */
    equal(): boolean;
    /**
     * @description 待完善
     * @description 判断所有 column 对应的值是相等的。
     * ignoreEmptyString undefined 与 '' 比较视为相等
     */
    isModelEqual(targetData: ModelBase, params?: {
        ignoreEmptyString?: boolean;
    }): boolean;
    /**
     * @description 待完善
     * @description 判断所有 column 对应的值是相等的。
     * ignoreEmptyString undefined 与 '' 比较视为相等
     */
    isContainsModel(targetData: ModelBase, params?: {
        ignoreEmptyString?: boolean;
    }): boolean;
    /**
     * @description 还原数据到上一个保存点之前，初始化保存点为创建对象的时候。
     */
    revertChangedData(): this;
    /**
     * @description 当前对象相对于保存点是否有变化。
     * ignoreEmptyString undefined 变为 '' 视为没有变化
     */
    isChanged(params?: {
        group?: string;
        excludeGroup?: string;
        trim?: boolean;
        ignoreEmptyString?: boolean;
    }): boolean;
    /**
     * @description 变更保存点，将当前的数据作为最新的保存点。
     */
    saveChangedData(param?: {
        group?: string;
        excludeGroup?: string;
        enableDataState?: boolean;
    }): this;
    /**
     * @description 获得对象被更改前的原始数据。
     */
    getOriginalData(): any;
    /**
     * @description 获得可被序列化的 object 对象，这个对象去除了 空字符 空对象 空数组。
     */
    getCleanSerializableObject(params?: {
        group?: string;
        excludeGroup?: string;
        camelCase?: boolean;
        trim?: boolean;
    }): {
        [index: string]: any;
    };
    /**
     * @description 获得可被序列化的 object 对象，这个对象没有去除了 空字符 空对象 空数组。
     * @param params
     * clean 默认 CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL 兼容老的数据
     */
    getSerializableObject(params?: {
        trim?: boolean;
        group?: string;
        excludeGroup?: string;
        clean?: CLEAN_ENUM;
        emptyValue?: any;
        emptyValueScope?: any[];
        camelCase?: boolean;
    }): {
        [index: string]: any;
    };
    /**
     *
     * @description 获得可被序列化的 string 字符串，这个字符串去除了 空字符 空对象 空数组。
     */
    getCleanSerializableString(param?: {
        group?: string;
        excludeGroup?: string;
        trim?: boolean;
        camelCase?: boolean;
    }): string;
    /**
     * @description 获得可被序列化的 string 字符串，这个没有字符串去除了 空字符 空对象 空数组。
     */
    getSerializableString(param?: {
        group?: string;
        excludeGroup?: string;
        trim?: boolean;
        camelCase?: boolean;
    }): string;
    /**
     * @description 获取在上一个保存点之后的变更数据，这个数据只会包含变化的 column 的键值对。
     * @param params
     * clean 默认 CLEAN_ENUM.CLEAN_UNDEFINED_AND_NULL 兼容老的数据
     */
    getChangedData(params?: {
        group?: string;
        excludeGroup?: string;
        trim?: boolean;
        clean?: CLEAN_ENUM;
        descriptor?: boolean;
        ignoreEmptyString?: boolean;
        camelCase?: boolean;
        emptyValue?: any;
        emptyValueScope?: any[];
    }): {
        [key: string]: any;
    };
    /**
     * @descriptor 获得变化数据的描述。
     */
    getChangedDescriptor(params?: {
        group?: string;
        excludeGroup?: string;
        trim?: boolean;
        clean?: CLEAN_ENUM;
        ignoreEmptyString?: boolean;
        emptyValue?: any;
    }): {
        [key: string]: any;
    };
    /**
     * @description
     * @param model
     */
    extend(model: any): this;
    /**
     * deep: 默认是false，后续实现。
     * @param model
     * @param options
     */
    extendModel(model: ModelBase, options?: {
        deep: boolean;
    }): this;
    /**
     * @description 获得 model 的主键集合。
     */
    getPrimaryKey(): {
        primaryKey: string;
        primaryColumn: any;
    }[];
    /**
     * @description 在当前对象中获得主键对应的值集合。
     */
    getPrimaryValue(): any[];
    /**
     * @description 从传入对象中获得主键对应的值集合。
     * @param model
     */
    getPrimaryValueFromData(model: any): any[];
    getColumns(data?: {
        dto?: any;
    }): {
        [x: string]: any;
    };
    setColumnData(key: string, value: any): this;
    getColumnData(key: string): any;
}
