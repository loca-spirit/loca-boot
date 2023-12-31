import { ModelBase } from './ModelBase';
import { IColumnDefined, IDataModel } from '../decorator';
import { IModelOptions } from '../utils/ModelBaseUtil';
export declare function genType(typeStr: string, column: IColumnDefined): any;
export declare function dynamicModelBase(columnObj: {
    [key: string]: IColumnDefined;
}, params?: IDataModel): new (dto?: any, options?: IModelOptions) => ModelBase;
