/**
 * 常用来处理，数字或者boolean类型的数据，如果值是undefined、null、''的时候，需要进行特殊转换成统一的字符串比如转换为：'#'或者''。
 * 一般用在getChangeData里面比较多，getSerializableObject方法一般不需要处理。
 * @param targetValue
 * @param emptyValueScope 一般[Number, Boolean]就满足需求了，String类型组件默认会将空数据处理为''字符串。
 * @param emptyValue
 * @param columnType
 */
export function setEmpty(targetValue: any, emptyValueScope: any = [Number, Boolean], emptyValue: any, columnType: any) {
  let isEmptyValueSet = false
  // 支持1：支持 emptyValueScope 指定的类型。
  // 支持2：TODO 通过设置emptyValueScope为 'all' 的情况来对所有类型的数据进行处理。all的场景过于复杂，尤其是array和有childType类型的。
  // 支持3：TODO 或者指定单个字段的值的。
  if (
    emptyValueScope?.length &&
    typeof emptyValue !== 'undefined' &&
    (emptyValueScope as any[]).findIndex((type) => columnType === type) !== -1
  ) {
    // 默认对 'undefined'、null、''都进行处理，后续可以考虑指定对哪些值进行转换（目前暂不考虑这么复杂的应用）。
    if (typeof targetValue === 'undefined' || targetValue === null || targetValue === '') {
      isEmptyValueSet = true
    }
  }
  return isEmptyValueSet
}
