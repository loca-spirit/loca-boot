import { ModelBase } from './model';
export * from 'loca-boot-common';
export * from './PageMemory';
export * from './utils/modelTool';
export * from './api';
export * from './decorator';
export * from './model';
export * from './utils/lib';
type ElementOf<T> = T extends Array<infer E> ? E : never;
export declare const propertiesOf: <TObj>(_obj?: TObj | undefined) => <T extends keyof TObj>(name: T) => T;
export declare function getDataList<T = any>(data: ModelBase[], itemType: (new (dto: any) => ElementOf<T>)): T;
export declare function getDataObj<T>(data: {
    [key: string]: ModelBase;
}, itemType: (new (dto: any) => any)): T;
export declare function getData<T = any>(data: ModelBase, type: (new (dto: any) => T)): T;
