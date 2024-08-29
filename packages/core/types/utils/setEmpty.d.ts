/**
 * 常用来处理，数字或者boolean类型的数据，如果值是undefined、null、''的时候，需要进行特殊转换成统一的字符串比如转换为：'#'或者''。
 * 一般用在getChangeData里面比较多，getSerializableObject方法一般不需要处理。
 * @param targetValue
 * @param emptyValueScope 一般[Number, Boolean]就满足需求了，String类型组件默认会将空数据处理为''字符串。
 * @param emptyValue
 * @param columnType
 */
export declare function setEmpty(targetValue: any, emptyValueScope: any, emptyValue: any, columnType: any): boolean;
