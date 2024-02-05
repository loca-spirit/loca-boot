import { ModelBase } from './ModelBase';
import { IColumnDefined, IDataModel } from '../decorator';
import { IModelOptions } from '../utils/ModelBaseUtil';
export declare function genType(typeStr: string, column: IColumnDefined): any;
type Model<T> = T extends ModelBase ? ModelBase : T;
export declare function dynamicModelBase<T = ModelBase>(columnObj: {
    [key: string]: IColumnDefined;
}, params?: IDataModel): new (dto?: any, options?: IModelOptions) => Model<T>;
export {};
