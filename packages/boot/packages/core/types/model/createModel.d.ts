import { IColumnDefined, IDataModel } from '../decorator';
type SnakeCase<T> = T extends `${infer F}${infer R}` ? F extends Capitalize<F> ? `_${Uncapitalize<F>}${SnakeCase<R>}` : `${F}${SnakeCase<R>}` : T;
type ExcludeFunction<T> = Pick<T, {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T]>;
type ModelSnakeCase<T> = {
    [K in keyof ExcludeFunction<T> as SnakeCase<K>]?: T[K];
};
type Model<T> = {
    [K in keyof ExcludeFunction<T>]?: T[K];
};
export declare function createModel<T>(model: new (dto: any) => T, dto: ModelSnakeCase<T> & Model<T>, params?: IDataModel): T;
export declare function createDynamicModel(columnObj: {
    [key: string]: IColumnDefined;
}, dto: any, params?: IDataModel): import("./ModelBase").ModelBase;
export {};
