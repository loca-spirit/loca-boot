interface IRouterTreeChildRen {
    identifier: string;
}
interface IRouterTree {
    identifier: string;
    parent?: string;
    children?: IRouterTreeChildRen[];
}
export declare class PageMemory {
    cacheNode: string[];
    routerTree: IRouterTree[];
    private menuMap;
    init(routerTree: IRouterTree[]): void;
    cachePageNode(name: string | undefined): void;
    private isRootMenu;
    private isMemberInChain;
    private getMemberChain;
    private toListMenu;
}
export {};
