import { IApi } from './IApi';
export interface IDriver {
    getApi(): IApi;
    getUrl(): string;
}
