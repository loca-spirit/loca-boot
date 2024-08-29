import { DataWrapper } from './DataWrapper';
export declare class DataStreamWrapper extends DataWrapper {
    static className: string;
    dataType?: 'blob' | 'stream' | 'objectURL';
    responseType?: 'blob' | 'arraybuffer' | 'json' | 'document' | 'text';
    responseObj?: 'blob' | 'objectURL' | 'arraybuffer';
    autoParseJson?: boolean;
    responseObjOptions?: any;
    constructor(data?: {
        /**
         * @deprecated 已经舍弃，建议用 responseType 和 responseObj 进行组合。
         */
        dataType?: 'blob' | 'stream' | 'objectURL';
        /**
         * 不能和 dataType 同时使用。
         * 默认值是 blob。
         * 搭配方式：
         * responseType: 'blob', responseObj: 'blob'， responseObj不用传。
         * responseType: 'blob', responseObj: 'objectURL'
         * responseType: 'arraybuffer', blob: ''
         * responseType: 'arraybuffer', objectURL: ''
         */
        responseType?: 'blob' | 'arraybuffer';
        /**
         * 不能和 dataType 同时使用。
         * 默认值是 blob。
         * responseType: 'blob', responseObj: 'blob'， responseObj不用传。
         * responseType: 'blob', responseObj: 'objectURL'
         * responseType: 'arraybuffer', blob: ''
         * responseType: 'arraybuffer', objectURL: ''
         */
        responseObj?: 'blob' | 'arraybuffer' | 'objectURL';
        /**
         * 待拓展项目，目前设置参数包括 type。
         * 比如 responseObj 为 blob 的时候，可以设置，如：
         * {
         *  responseObjOptions: {
         *    type: 'application/octet-stream',
         *  }
         * }
         * 最终结果：
         * new Blob([dto], {
         *  type: this.responseObjOptions.type || '',
         *  })
         *
         */
        responseObjOptions?: {
            type: string;
        };
        /**
         * 不能和 dataType 同时使用。
         * 默认值是 true。后端的 content-type 里面包含 'application/json' 的时候生效。
         */
        autoParseJson?: boolean;
    });
    getClassName(): string;
    getData(dto: any): any;
}
