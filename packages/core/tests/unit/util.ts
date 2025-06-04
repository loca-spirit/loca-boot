import { ModelBase } from '@model-base/core'

export function setModelBaseDefault() {
  ModelBase.dtoNamingMethod = 'mix'
  ModelBase.columnNamingMethod = ''
}

export function setDefaultList() {
  return []
}
