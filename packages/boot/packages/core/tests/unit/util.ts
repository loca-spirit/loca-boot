import { ModelBase } from 'loca-boot-core'

export function setModelBaseDefault() {
  ModelBase.dtoNamingMethod = 'mix'
  ModelBase.columnNamingMethod = ''
}

export function setDefaultList() {
  return []
}
