import { IDriver } from './IDriver';
import { IApi } from './IApi';
export declare class Driver implements IDriver {
    adapter: {
        api: IApi;
        url: string;
    };
    constructor(adapter: {
        api: IApi;
        url: string;
    });
    getApi(): IApi;
    getUrl(): string;
}
