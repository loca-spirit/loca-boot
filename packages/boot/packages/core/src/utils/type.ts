export const Type = Function;

export function isType(v: any): v is Type<any> {
  return typeof v === 'function';
}

export type Type<T> = new (...args: any[]) => T;

export type Mutable<T extends{[x: string]: any}, K extends number> = {
  [P in K]: T[P];
};
