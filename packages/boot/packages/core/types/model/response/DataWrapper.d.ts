export declare abstract class DataWrapper {
    static className: string;
    abstract getData(dto: any): any;
    abstract getClassName(): string;
}
