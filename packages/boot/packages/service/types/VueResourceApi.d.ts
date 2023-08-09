import VueResource from 'vue-resource';
import { IApi } from 'loca-boot-core';
declare module 'vue/types/vue' {
    interface VueConstructor {
        http: VueResource.Http;
    }
}
export declare class VueResourceApi implements IApi {
    static http: {
        urlParams?: () => string;
    };
    get(url: string, params: any, options: any): Promise<unknown>;
    post(url: string, body: any, options: any): Promise<unknown>;
    del(url: string, options: any): Promise<unknown>;
    put(url: string, body: any, options: any): Promise<unknown>;
    private getCommonParams;
}
