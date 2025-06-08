import { NAMING_STRATEGIES } from '../constant'
import { IColumnInner } from '../decorator'

export function getColumnSerializeName(field: IColumnInner, sns?: string): string {
  if (sns === NAMING_STRATEGIES.camelCase) {
    return field.camelCaseName
  }
  return field.name
}
