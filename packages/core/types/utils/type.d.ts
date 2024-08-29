export declare const Type: FunctionConstructor;
export declare function isType(v: any): v is Type<any>;
export type Type<T> = new (...args: any[]) => T;
export type Mutable<T extends {
    [x: string]: any;
}, K extends number> = {
    [P in K]: T[P];
};
