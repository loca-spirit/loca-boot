export declare function debounce(func: any, wait: number, options?: {
    trailing?: boolean;
    maxWait?: number;
    leading?: boolean;
}): {
    (...args: any[]): any;
    cancel: () => void;
    flush: () => any;
    pending: () => boolean;
};
