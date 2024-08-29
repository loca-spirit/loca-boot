export declare function throttle(func: any, wait: number, options: any): {
    (...args: any[]): any;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
